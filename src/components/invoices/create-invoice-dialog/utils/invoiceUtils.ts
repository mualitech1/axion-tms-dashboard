
/**
 * Determine payment terms from issue and due dates
 */
export function getPaymentTermsFromDates(issueDate: string, dueDate: string): string {
  const issue = new Date(issueDate);
  const due = new Date(dueDate);
  const diffDays = Math.round((due.getTime() - issue.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 15) return "net15";
  if (diffDays <= 30) return "net30";
  return "net60";
}
