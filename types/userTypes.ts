export interface User {
  id: string;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  WriterConfirmed: boolean;
  RequestToBecomeWriter: boolean;
}

export interface Author {
  authorName: string;
  authorOccupation: string;
  authorCountry: string;
  authorState: string;
  authorProfileImage: {
    url: string;
    alternativeText: string;
  };
}
