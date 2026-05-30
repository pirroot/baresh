const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const getFaq = async () => {
  const data = await fetch(`${baseUrl}/api/admin/faq`);
  return await data.json();
};

export const createFaq = async (faq: { question: string; answer: string }) => {
  const result = await fetch(`${baseUrl}/api/admin/faq`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(faq),
  });
  return await result.json();
};

export const deleteFaq = async (id: string) => {
  const result = await fetch(`${baseUrl}/api/admin/faq`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  return await result.json();
};
