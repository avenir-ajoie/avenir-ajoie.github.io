# Avenir Ajoie

Site de l'association, généré par [Jekyll](https://jekyllrb.com) et publié par GitHub Pages à chaque push sur `main`.

## Où modifier quoi

| Pour changer… | Fichier |
|---|---|
| Un projet (texte, photo, liens) | `_projets/<projet>.md` |
| Ajouter un projet | Copier un fichier de `_projets/` ; `order` fixe sa place dans les listes |
| Les autres pages | `index.html`, `association.html`, `projets.html`, `contact.html` |
| Les menus | `_data/navigation.yml` |
| Facebook et Instagram | `_data/social.yml` |
| L'e-mail et autres détails | `_config.yml` |
| Les couleurs et la mise en page | `assets/css/style.css` |
| Les photos | `assets/images/` |

## Aperçu local

```sh
bundle install
bundle exec jekyll serve
```

Le site est alors visible sur <http://localhost:4000>.
