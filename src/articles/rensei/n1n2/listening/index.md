---
layout: base.njk
title: 聽解文章列表
pagination:
  data: collections.listening
  size: 10
  reverse: true
  alias: article
permalink: /articles/rensei/n1n2/listening{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber }}/{% endif %}index.html
---
<div class="article-box">
  <ul class="article-listening-list">
    {% for article in pagination.items %}
    <li>
      <a href="{{ article.url }}">
        {{ article.date | htmlDateString }} {{ article.data.title }}
      </a>
    </li>
    {% endfor %}
  </ul>
  <div class="article-page">
    {% if pagination.href.previous %}
      <a href="{{ pagination.href.previous }}">上一頁</a>
    {% endif %}

    {% if pagination.href.next %}
      <a href="{{ pagination.href.next }}">下一頁</a>
    {% endif %}
  </div>
</div>

