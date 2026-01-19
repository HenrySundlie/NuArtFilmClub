import { makeAutoObservable } from 'mobx';
import articlesData from '../articles/articles.json';

export interface Article {
  id: number;
  title: string;
  date: string; // ISO date (YYYY-MM-DD)
  author: string;
  description: string;
  img: string;
  /**
   * Optional slug (without extension) of a markdown article located under `src/content/articles/`.
   * If provided and the corresponding file `<slug>.md` exists, it will be rendered
   * on the article detail page. Kept optional for backward compatibility.
   */
  article?: string;
}

class ArticleStore {
  articles: Article[] = articlesData as Article[];

  constructor() {
    makeAutoObservable(this);
  }

  fetchArticles() {
    const raw = articlesData as unknown as Article[];
    this.articles = raw;
  }
}

export const articleStore = new ArticleStore();
