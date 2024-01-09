export interface MarvelApiCharsResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: MarvelChar[];
  };
}

export interface MarvelChar {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Collection;
  series: Collection;
  stories: Collection;
  events: Collection;
  urls:
    {
      type: string;
      url: string;
    }[];
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Comic {
  resourceURI: string;
  name: string;
  type?: string;
}

export interface Collection {
  available: number;
  collectionURI: string;
  items: Comic[];
  returned: number;
}
