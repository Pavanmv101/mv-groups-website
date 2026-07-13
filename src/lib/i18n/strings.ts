export const strings = {
  en: {
    common: {
      submit: 'Submit',
      cancel: 'Cancel',
      loading: 'Loading...',
      success: 'Success',
      error: 'Error',
    },
    nav: {
      home: 'Home',
      services: 'Services',
      careers: 'Careers',
      about: 'About',
      contact: 'Contact',
    },
    booking: {
      title: 'Book a Service',
      contactDetails: 'Contact Details',
      eventDetails: 'Event Details',
      requestQuote: 'Request Quote',
      successMessage: 'Your booking request has been submitted successfully.',
    },
    admin: {
      dashboard: 'Admin Dashboard',
      bookings: 'Bookings',
      users: 'Users',
      updates: 'Updates',
    }
  }
}

export type Locale = keyof typeof strings;
export const defaultLocale: Locale = 'en';

export function getStrings(locale: Locale = defaultLocale) {
  return strings[locale];
}
