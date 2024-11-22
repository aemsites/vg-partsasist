# partsasist.com
Helix site for https://partsasist.com/

## Environments
- Preview: https://main--vg-partsasist--aemsites.aem.page/
- Live: https://main--vg-partsasist--aemsites.aem.live/

## Installation

```sh
npm i
```

## Tests

```sh
npm tst
```

## Local development

1. Create a new repository based on the `helix-project-boilerplate` template and add a mountpoint in the `fstab.yaml`
2. Add the [helix-bot](https://github.com/apps/helix-bot) to the repository
3. Install the [Helix CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
4. Start AEM Proxy: `aem up` (opens your browser at http://localhost:3000)
5. Open the `{repo}` directory in your favorite IDE and start coding :)
