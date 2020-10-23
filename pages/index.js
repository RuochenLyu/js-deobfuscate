import { useState } from 'react';
import Layout from '@/components/layout';
import Header from '@/components/header';
import Form from '@/components/form';
import Output from '@/components/output';

export default function Home() {
  const [content, setContent] = useState('');

  const handleChange = (result) => {
    setContent(result);
  };

  return (
    <Layout>
      <Header />
      <Form onChange={handleChange} />
      <Output content={content} />
    </Layout>
  );
}
