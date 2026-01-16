import { useParams } from 'react-router-dom';
import { articleStore } from '../stores/ArticleStore';
import { useEffect, Suspense, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Content,
  Title,
  MetaSection,
  MetaItem,
  Label,
  Description,
  ArticleContent,
  BackLink,
} from '../styles/ArticlePage.styles';
import { lazy } from 'react';
const ReactMarkdown = lazy(() => import('react-markdown'));

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

  if (!article) return <Container>Article not found</Container>;

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
    <Container>
      <Content>
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
      </Content>
    </Container>
  );
});

export default ArticlePage;
