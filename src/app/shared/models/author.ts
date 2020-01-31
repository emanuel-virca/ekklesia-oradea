export interface Author {
  id?: string;
  firstName: string;
  lastName: string;
  avatar: string;
  description?: string;
}

export interface AuthorSnippet {
  id?: string;
  name: string;
  avatar?: string;
}

export function convertToAuthorSnippet(author: Author): AuthorSnippet {
  if (!author) {
    return null;
  }

  return { id: author.id, name: `${author.firstName} ${author.lastName}`.trim(), avatar: author.avatar };
}
