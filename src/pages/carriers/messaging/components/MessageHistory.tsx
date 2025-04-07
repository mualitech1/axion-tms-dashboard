
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { EyeIcon, UsersIcon } from 'lucide-react';

interface MessageHistoryProps {
  messages: {
    id: string;
    subject: string;
    content: string;
    sentAt: string;
    recipientGroupId: string;
    recipientGroupName: string;
    recipientCount: number;
    readCount: number;
  }[];
}

export default function MessageHistory({ messages }: MessageHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Message History</CardTitle>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No messages have been sent yet.
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium">{message.subject}</h3>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(message.sentAt), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="mt-2 text-sm">
                    <p className="line-clamp-2">{message.content}</p>
                  </div>
                  <div className="mt-4 flex items-center flex-wrap gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <UsersIcon className="h-3 w-3" />
                      {message.recipientCount} recipients
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <EyeIcon className="h-3 w-3" />
                      {message.readCount} read
                    </Badge>
                    <Badge variant="secondary">{message.recipientGroupName}</Badge>
                    <Badge 
                      variant="outline" 
                      className={message.readCount === 0 ? "bg-yellow-50 text-yellow-700" : ""}
                    >
                      {(message.readCount / message.recipientCount * 100).toFixed(0)}% read rate
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
