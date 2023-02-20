# Video as screen

<script setup>
import { ref } from 'vue';
import '../../dist/three-d-mockup';
import screenVideo from '../assets/screen.mp4';
</script>

<three-d-mockup
  style="display: block; width: 100%; height: 400px;"
  :screen="screenVideo"
/>

The `screen` prop also accepts a video.

## Code example

::: code-group

```html [vanilla]
<head>
  <script src="three-d-mockup"></script>
</head>

<body>
  <three-d-mockup 
    style="display: block;"
    screen="./assets/screen.mp4"
  ></three-d-mockup>
</body>
```

```vue [vue]
<script setup>
import { ref } from 'vue';
import 'three-d-mockup';
import screenVideo from './assets/screen.mp4';
</script>

<three-d-mockup
  style="display: block;"
  :screen="screenVideo"
/>
```

:::