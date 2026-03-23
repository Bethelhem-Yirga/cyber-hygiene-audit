// src/components/ReportGenerator.jsx
import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20 },
  score: { fontSize: 18, marginBottom: 10, color: '#2563eb' },
  recommendation: { fontSize: 12, marginBottom: 5, color: '#374151' }
});

const PDFReport = ({ result }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Cyber Hygiene Audit Report</Text>
      <Text style={styles.score}>Overall Score: {result.overallScore}%</Text>
      <Text style={{ fontSize: 16, marginTop: 20 }}>Recommendations:</Text>
      {result.recommendations.map((rec, i) => (
        <Text key={i} style={styles.recommendation}>• {rec}</Text>
      ))}
    </Page>
  </Document>
);

const ReportGenerator = ({ result }) => (
  <PDFDownloadLink 
    document={<PDFReport result={result} />} 
    fileName="cyber-hygiene-report.pdf"
    className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg"
  >
    {({ loading }) => loading ? 'Generating PDF...' : 'Download PDF Report'}
  </PDFDownloadLink>
);