import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SERVICES } from '@/lib/constants';

export type Booking = {
  id: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  service_type: string;
  start_date: string;
  end_date: string;
  people_needed: number;
  status: string;
  created_at: string;
  amount?: number | null;
  description?: string;
};

const getServiceName = (id: string) => {
  return SERVICES.find(s => s.id === id)?.title || id;
};

export const generateQuotePDF = (booking: Booking, customPrice: number) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Theme Colors
  const primaryColor = [12, 11, 10]; // #0c0b0a
  const accentColor = [243, 200, 146]; // #f3c892
  const textColor = [60, 60, 60];

  // --- Header ---
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('MV GROUPS', 14, 25);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Event Staffing & Manpower Solutions', 14, 32);

  doc.setFontSize(20);
  doc.text('OFFICIAL QUOTE', 140, 25);
  doc.setFontSize(10);
  doc.text(`Date: ${date}`, 140, 32);

  // --- Client Details ---
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Prepared For:', 14, 55);
  
  doc.setFont('helvetica', 'normal');
  doc.text(booking.contact_name || 'Valued Client', 14, 62);
  doc.text(booking.contact_email || 'N/A', 14, 68);
  doc.text(booking.contact_phone || 'N/A', 14, 74);

  // --- Booking Details ---
  doc.setFont('helvetica', 'bold');
  doc.text('Event Details:', 120, 55);
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Booking ID: ${booking.id.split('-')[0].toUpperCase()}`, 120, 62);
  doc.text(`Start Date: ${new Date(booking.start_date).toLocaleDateString('en-IN')}`, 120, 68);
  if (booking.end_date) {
    doc.text(`End Date: ${new Date(booking.end_date).toLocaleDateString('en-IN')}`, 120, 74);
  }

  // --- Table of Services ---
  const tableData = [
    [
      getServiceName(booking.service_type),
      booking.people_needed.toString(),
      `INR ${customPrice.toLocaleString('en-IN')}`
    ]
  ];

  autoTable(doc, {
    startY: 90,
    head: [['Description of Service', 'Staff / Quantity', 'Estimated Total']],
    body: tableData,
    theme: 'grid',
    headStyles: { 
      fillColor: primaryColor as [number, number, number],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    styles: {
      font: 'helvetica',
      fontSize: 10,
      cellPadding: 6,
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 40, halign: 'center' },
      2: { cellWidth: 50, halign: 'right' }
    }
  });

  const finalY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15;

  // --- Total Section ---
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Estimated Value:', 120, finalY);
  
  doc.setFontSize(14);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`INR ${customPrice.toLocaleString('en-IN')}`, 170, finalY, { align: 'right' });

  // --- Terms & Footer ---
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Terms & Conditions:', 14, finalY + 20);
  doc.text('1. This quote is valid for 15 days from the date of issue.', 14, finalY + 26);
  doc.text('2. A 50% advance payment is required to confirm the booking.', 14, finalY + 31);
  doc.text('3. Any additional hours or staff requested on-site will be billed extra.', 14, finalY + 36);

  doc.text('Thank you for choosing MV Groups. We look forward to making your event a success!', 14, 280, { align: 'left' });
  
  doc.setFontSize(8);
  doc.text('mvgroups.online | mvgroups2026@gmail.com | +91 93805 58344', 105, 290, { align: 'center' });

  // Save the PDF
  doc.save(`MV_Groups_Quote_${booking.contact_name.replace(/\s+/g, '_')}.pdf`);
};
