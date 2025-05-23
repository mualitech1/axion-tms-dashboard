export enum CONTACT_TYPES {
  PRIMARY = 'primary',
  INVOICE = 'invoice',
  OPERATIONS = 'operations'
}

export const CONTACT_TYPE_LABELS = {
  [CONTACT_TYPES.PRIMARY]: 'Primary Contact',
  [CONTACT_TYPES.INVOICE]: 'Invoice Contact',
  [CONTACT_TYPES.OPERATIONS]: 'Operations Contact'
}; 