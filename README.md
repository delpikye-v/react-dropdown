<div align="center">
    <h1>react-dropdown-z</h1>
    <a href="https://github.com/delpikye-v/react-dropdown">react-dropdown-z</a>
    <br />
    <b><a href="https://codesandbox.io/s/jsvnj1">LIVE EXAMPLE</a></b>
</div>

---

#### Description

+ Simple dropdown, (group) component for react.
+ Append perfect scrollbar.
+ Support show top.
+ Fit size with window if it is over.
+ If you want more, please use react-select.

---
### Usage

Install the package

```js
// apply perfectscrollbar  (require)
npm ínitall --save react-perfect-scrollbar-z

npm install --save react-dropdown-z

```

Import the module in the place you want to use:
```js
import 'react-perfect-scrollbar-z/build/styles.css';
import "react-dropdown-z/build/styles.css";
import Dropdown from "react-dropdown-z";

```

#### Snippet
```js
    const [value, setValue] = React.useState();

    // flat options
    const options = [ "o1", "tw2", "th3", "f4" ];

    <Dropdown
      // placeholder="sdjks"
      options={options}
      width="200px"
      heightDropdown="900px"
      value={value}
      onSelection={setValue}
      // showTop
      // resizeClose={false}
    />


    <Dropdown
      // placeholder="sdjks"
      keyName="val"
      labelName="text"
      options={options2}
      width="200px"
      heightDropdown="900px"
      value={value}
      onSelection={setValue}
      // showTop
      // resizeClose={false}
    />

    // Object array
    // keyName and labelName
    const options2 = [
      // { dsds: 'dsd' }, // => please set key and value
      {
        val: 0,
        text: 'this one',
      },
      {
        val: 2,
        text: 'this one 2',
      },
      {
        val: 3,
        text: 'this one 3',
        className: 'class-3'
      },
      {
        val: 10,
        text: 'this one 10',
        disabled: true
      },

      // group
      {
        isGroup: true,
        groupName: 'group a',
        className: 'groupclass'
        items: [
          {
            val: 4,
            text: 'this one 4',
          },
        ],
      },
    ]

```

---

#### props

see <b>index.d.ts</b>


| props                | type                          | description                                                                |
|----------------------|-------------------------------|----------------------------------------------------------------------------|

```js
  className?: string;
  arrowClassName?: string;
  groupItemClassName?: string;
  dropdownClassName?: string;
  placeholderClassName?: string;
  showTop?: boolean;
  options: any[];
  keyName?: string; // only option is array
  labelName?: string;  // only option is array
  value?: string | number | null;
  customizeArrow?: string | React.ReactNode;
  placeholder?: string;
  noDataMessage?: string; // labelName when no option
  width?: string | number; // box with
  height?: string | number; // box height
  // fullWidth?: boolean;
  tabIndex?: number;
  disabled?: boolean;
  heightDropdown?: string | number; // menu height
  open?: boolean;
  keepScrollPosition?: boolean;
  resizeClose?: boolean;
  onSelection?: (value: string | number | null, selectItem?: any) => any;
  onShown?: () => void;
  onHidden?: () => void;
```

<br />

#### Note
<br />

#### RUN

<b><a href="https://codesandbox.io/u/delpi.k">LIVE EXAMPLE</a>

<br />

### License

MIT
