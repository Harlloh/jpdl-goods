export const sanitizeForId = (text:any) => text.replace(/\s+/g, '-').toLowerCase();

export const handleScrollToCategory = (category: string) => {
    const targetElement = document.getElementById(sanitizeForId(category));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };