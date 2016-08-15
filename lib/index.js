import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import setupArticle from 'article-json-html-render';
import embeds from './embeds';

const Article = setupArticle({ embeds });

module.exports = items => renderToStaticMarkup(<Article items={items || []} />)
  .replace(/<br><\/br>/g, '<br/>'); // fix double br bug
