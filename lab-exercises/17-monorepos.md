# Lab 17 - Mono-repos

## Intro

In this lab we will create a mono-repo, with a shared library and then see how to use that library in a project.

## 1. Create a new mono repo

1. Run this command:

`
npx create-nx-workspace@latest building-project
`

2. Make the following responses to each question:

- Which stack do you want to use? : angular
- Integrated monorepo, or standalone project? : integrated
- Application name : building-project
- Which bundler would you like to use? : esbuild
- Default stylesheet format : css
- Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? : No
- Which unit test runner would you like to use? : jest
- Test runner to use for end to end (E2E) tests : playwright
- Which AI agents, if any, would you like to set up? : No items were selected
- Which CI provider would you like to use? : skip
- Would you like remote caching to make your build faster? : skip

## 2. Create a library to store a UI components that can be used accross multiple projects

1. CD into the project folder, then create a new library with

`
npx nx g @nx/angular:lib --name=ui-components --directory=shared --buildable
`

Choose Jest for testing.

## 3. Create an application

1. create a new application with

`
npx nx g @nx/angular:app sample-app
`

- choose esbuild as the build type
- say No to server side rendering

2. Start the app running with 

`npx nx serve sample-app`

# 4. Create a library component

1. Open the project in your IDE

2. Run this command to create a footer component in the ui-components library:

`
nx g @nx/angular:component --name=footer 
--path=shared/src/lib/ui-components/footer --standalone --export --selector=bp-footer
`

When prompted to install the nx console, say yes.

3. Add some content to the footer HTML:

```html
<footer class="footer">
  <div class="container">
    <p>&copy; {{ year }} Building Project.  All rights reserved.</p>
  </div>
</footer>
```
4. In the fotter typescript file add in the year field

```typescript
year = new Date().getFullYear();
```

5. In the footer css file define some styling:

```css
.footer {
  padding: 1rem;
  border-top: 1px solid rgba(0,0,0,.08);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  font-size: 0.875rem;
  opacity: 0.8;
}

```

# 5. Use a library component

1. In the sample app, add the imports of the Footer component into the app.ts file

```typescript
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';

import { Footer } from '@building-project/ui-components'

@Component({
  imports: [NxWelcome, RouterModule, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'sample-app';
}
```

2. Place the component on the page 

```html
<h1>This is a sample app</h1>
<bp-footer></bp-footer> 
```

3. Test this in your browser - if the application isn't running start it with:

`
npx nx serve sample-app
`