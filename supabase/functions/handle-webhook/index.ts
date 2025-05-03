
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract the integration ID from query parameter
    const url = new URL(req.url);
    const integrationId = url.searchParams.get('integration_id');
    
    if (!integrationId) {
      return new Response(
        JSON.stringify({ error: 'Missing integration_id query parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify the integration exists
    const { data: integration, error: integrationError } = await supabase
      .from('integrations')
      .select('id')
      .eq('id', integrationId)
      .single();

    if (integrationError || !integration) {
      return new Response(
        JSON.stringify({ error: 'Invalid integration_id' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Parse the request body
    let payload;
    const contentType = req.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      payload = await req.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();
      payload = Object.fromEntries(formData);
    } else {
      // Fallback to text
      payload = { rawData: await req.text() };
    }

    // Store the webhook event in the database
    const { data, error } = await supabase
      .from('webhook_events')
      .insert([{
        integration_id: integrationId,
        event_type: req.headers.get('x-event-type') || 'webhook',
        payload,
        processed: false,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) throw error;

    console.log('Webhook event stored:', data[0].id);
    
    // Return a success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Webhook received and stored',
        event_id: data[0].id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
