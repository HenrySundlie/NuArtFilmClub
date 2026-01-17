import { useParams } from 'react-router-dom';
import { articleStore } from '../stores/ArticleStore';
import { useEffect, Suspense, useState, lazy } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import {
  Title,
  MetaSection,
  MetaItem,
  Label,
  Description,
  BackLink,
} from '../styles/ArticlePage.styles';
import { ContentSection, ContentText } from '../styles/HomePage.styles';
import { theme } from '../theme';
const ReactMarkdown = lazy(() => import('react-markdown'));

// Article content uses home page's ContentText styling for consistency
const ArticleContent = styled.article`
  /* Use the same text styling as home page content */
  p {
    margin-bottom: ${theme.spacing.md};
    text-align: justify;
    hyphens: auto;

    &:last-child {
      margin-bottom: 0;
    }
  }

  h2, h3, h4 {
    color: ${theme.colors.text.primary};
    margin: ${theme.spacing.lg} 0 ${theme.spacing.md} 0;
    font-weight: 600;
    line-height: 1.25;
  }

  h2 {
    font-size: 1.2em;
  }

  h3 {
    font-size: 1.1em;
  }

  ul, ol {
    margin: ${theme.spacing.md} 0;
    padding-left: ${theme.spacing.lg};
  }

  li {
    margin-bottom: ${theme.spacing.sm};
  }

  a {
    color: ${theme.colors.link};
    text-decoration: underline;
    text-underline-offset: 2px;
    &:focus-visible {
      outline: ${theme.shadows.focus};
      outline-offset: 3px;
      border-radius: 4px;
    }
  }

  blockquote {
    margin: 1.5em 0;
    padding: 0.75em 1em;
    border-left: 4px solid ${theme.colors.text.light};
    background: rgba(255,255,255,0.04);
    font-style: italic;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    margin: ${theme.spacing.lg} 0;
    border-radius: ${theme.radii.md};
  }
`;

const fmtDate = (iso?: string) => {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const ArticlePage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const [articleMd, setArticleMd] = useState<string | null>(null);

  useEffect(() => {
    if (articleStore.articles.length === 0) articleStore.fetchArticles();
  }, []);

  const article = articleStore.articles.find((a) => a.id === Number(id));

  if (!article) return <ContentSection><ContentText>Article not found</ContentText></ContentSection>;

  useEffect(() => {
    let isMounted = true;
    const slug = article.article || `article-${article.id}`;
    import(`../content/articles/${slug}.md?raw`)
      .then((mod) => {
        if (isMounted) setArticleMd(mod.default || String(mod));
      })
      .catch(() => {
        if (isMounted) {
          setArticleMd(null);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [article.id, article.article]);

  return (
    <ContentSection>
      <ContentText>
        <BackLink to="/articles" aria-label="Back to articles list" />
        <Title>{article.title}</Title>
        <MetaSection>
          <MetaItem>
            <Label>Published:</Label> {fmtDate(article.date)}
          </MetaItem>
          <MetaItem>
            <Label>Author:</Label> {article.author}
          </MetaItem>
        </MetaSection>

        <Description>{article.description}</Description>
        {articleMd && (
          <ArticleContent>
            <Suspense fallback={null}>
              <ReactMarkdown>{articleMd}</ReactMarkdown>
            </Suspense>
          </ArticleContent>
        )}
      </ContentText>
    </ContentSection>
  );
});

export default ArticlePage;
