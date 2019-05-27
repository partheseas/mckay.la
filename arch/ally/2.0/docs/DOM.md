# DOM Manipulators

## Ally.add(tag, base, callback)

Creates an element for each selected element with the specified tag and attributes.

`tag`: Tag type.

`base`: An object of attributes to apply to the object.

`callback`: Function or String to run when the elements are created.

    Ally('body').add('a', {
        href: 'http://google.com/',
        html: 'Click here to go to Google.'
    });

The above example would create an orange link to Google.

The created elements are accesssible through `.added`

## Ally.remove(callback)

Removes the elements, and then returns the parents.

`callback`: Function or String to run when the elements are removed.

    Ally('p')
        .remove(function () {
            prompt('Where'd they go?', 'Alaska');
        })
            .html('I\'m so empty. :(');

The above example would remove all paragraphs, ask where they went, and change the html of all the parents.

## Ally.fill(content, callback)

Changes/retrieves the content of the selected elements.

Ally.fill automatically detects whether the element uses `.value` or `.innerHTML`, and will use the correct property automatically.

`content`: The content to use in the selected elements.

`callback`: Function or String to run when the content is changed or retrieved.

    Ally('p').fill();

The above example would return an array of the content in all paragraphs.

    Ally('p').fill('Hello.');

The above example would change the HTML of all paragraphs to `"Hello."`

The `content` argument can also contain special keywords.

$value:

    Ally('p')
        .fill('Bob')
        .fill('Hello $value!');

The above example would change the HTML of all paragraphs to `'Hello Bob!'`

\#value:

    Ally('input')
        .fill('5')
        .fill('#value + 5');
    
    Ally('p')
        .fill('There are 5 people in line.')
        .fill('--#value');

The above example would change the value of all inputs to `10` and the HTML of all paragraphs to `'There are 4 people in line.'`




