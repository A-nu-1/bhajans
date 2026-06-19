export type Paragraph = {
  id: string;
  text: string;
  orderNo: number;
};

export type Bhajan = {
  id: string;
  title: string;
  titleEnglish: string | null;
  language: string;
  mainText: string;
  description: string | null;
  mediaUrl: string | null;
    categories: Category[];
  paragraphs: Paragraph[];
};

export type Category = {
  id: string;
  name: string;
};

export type BhajanParagraph = {
  id: string;
  text: string;
  orderNo: number;
};