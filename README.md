# Hexo-admonition 插件安装使用指南

## 简介

Hexo 内容辅助插件，支持将类似 [reStructuredText](https://docutils.sourceforge.io/docs/ref/rst/directives.html) 的警告提示块添加到 Markdown 文档中。例如 note、warning、error 等提示块，效果如图：

![Hexo-admonition 示例效果](https://pic.lixl.cn/2020/image-20200419230838823.png)

开发这个插件的动机，是想让 [hexo](https://hexo.io) 与 [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/extensions/admonition/) 的提示信息兼容，让系列文章在基于 MkDocs 搭建的子站中有更好的阅读体验。

查看更多内容，请访问博文：[Hexo-admonition 插件安装使用指南](https://www.lixl.cn/2020/041837756.html)。

## 安装说明

### 安装插件

```bash
npm install hexo-admonition --save
```

## 使用指南

### 语法说明

Hexo-admonition 遵循一种简单的语法：每个块都以 `!!!` 开头，然后是代表提示类型的关键字（`type`）及标题（`title`）。例如:

```text
!!! note Hexo-admonition 插件使用示例
    这是基于 hexo-admonition 插件渲染的一条提示信息。类型为 note，并设置了自定义标题。

    提示内容开头留 4 个空格，可以有多行，最后用空行结束此标记。

```

在 Hexo 渲染前，将被转换成如下内容：

```html
<div class="admonition note ">
  <p class="admonition-title">Hexo-admonition 插件使用示例</p>
  <p>这是基于 hexo-admonition 插件渲染的一条提示信息。类型为 note，并设置了自定义标题。</p>
  <p>提示内容开头留 4 个空格，可以有多行，最后用空行结束此标记。</p>
</div>
```

最终呈现效果如下：

![hexo-admonition 插件 note 提示示例](https://pic.lixl.cn/2020/image-20200420120245339.png)

### 支持的类型

提示类型 `type` 将用作 CSS 类名称，暂支持如下类型：

- `note`
- `info, todo`
- `warning, attention, caution`
- `error, failure, missing, fail`

### 设置/隐藏标题

标题 `title` 是可选的，当未设置时，将以 `type` 作为默认值:

```text
!!! warning
    这是一条采用默认标题的警告信息。
```

效果如下：

![默认标题警告提示块](https://pic.lixl.cn/2020/image-20200419232137875.png)

如果不想显示标题，可以将 `title` 设置为 `""`：

```text
!!! Warning ""
    这是一条不带标题的警告信息。
```

效果如下：

![无标题警告提示块](https://pic.lixl.cn/2020/image-20200419232337937.png)

### 嵌套 markdown 标记

在 `hexo-admonition` 内部，还可以嵌套标准 Markdown 标签，例如：

```text
!!! note "嵌套链接及引用块"
    欢迎访问我的博客链接：[悟尘纪](https://www.lixl.cn)

    >这里嵌套一行引用信息。
```

效果如下:

![嵌套效果](https://pic.lixl.cn/2020/image-20200419232539536.png)

### 样式配置

安装插件后，插件的样式由 `node_modules/hexo-admonition/style.css` 控制，可以修改该文件实现自定义的样式。

## License

MIT

## 参考

- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/extensions/admonition/)
