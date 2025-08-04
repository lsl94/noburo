---
layout: base.njk
title: 新聞聽解練習
pagination:
  data: collections.listening
  size: 10
  reverse: true
  alias: article
---
<div class="article-box">
  <ul class="article-list">
    {% for article in pagination.items %}
    <li>
      <a href="{{ article.url | url }}">
        <i class="fas fa-link"></i> {{ article.date | htmlDateString }} {{ article.data.title }}
      </a>
    </li>
    {% endfor %}
  </ul>
  <div class="article-page">
    {% if pagination.href.previous %}
      <a href="{{ pagination.href.previous | url }}">上一頁</a>
    {% endif %}

    {% if pagination.href.next %}
      <a href="{{ pagination.href.next | url }}">下一頁</a>
    {% endif %}
  </div>
</div>

