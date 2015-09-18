# action-tracker.js

The easy-to-use library for Google Analytics's tracking.

## Installation

bower:
```
```

npm:
```
```

## Examples

```html
<script src="dist/action-tracker.min.js"></script>
<script>
  ga('create', {YOUR PROPERTY ID})
</script>
<script>
  var tracker = actionTracker()

  $('a[data-tracker]').on('click', function () {
    tracker.emit('anchor', 'click', $(this).text())
  })
</script>
```

## Documantation

### tracker(options)

Create a tracker.
By default property id is `null`. In the case we will use the configured of `ga` object.

- options.id   [optional] ... Analytics's property id.
- options.name [optional] ... Tracker's name option. Call the method with a name (`ga('name.method', value)`) when you specify.

### tracker.set(name, value)

Set the `name` and `value` to the `ga` object.

- name  [required] ... The `fields`'s name.
- value [required] ... The `fields`'s value.

### tracker.send(name [, options])

Call the `send` method from `ga` object.

- name    [required] ... The `method` name.
- options [optional] ... The object of the `fields` you want to send. By default send `null`.

### tracker.pageview([path])

Send the page-view.

- path [optional] ... The URL's path for send. By default send the `tracker.get('path')`

### tracker.emit(category, action, label [, value])

Send event.

- category [required] ... Event category.
- action   [required] ... Event action.
- label    [optional] ... Event label. By default, set a `''`.
- value    [optional] ... Event value. By default, set a `null`.

## LICENSE

MIT
