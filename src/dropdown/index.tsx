import React, { useEffect, useRef, useState } from "react";
import { Hooks, HtmlUtils } from "@delpi/common";
import Scrollbar2 from "react-perfect-scrollbar-z";
import "./styles.scss";

export interface IGroupData {
  isGroup: boolean;
  groupName: string;
  className?: string;
  item: any[];
}

export interface IDropdownProps {
  className?: string;
  arrowClassName?: string;
  groupItemClassName?: string;
  dropdownClassName?: string;
  placeholderClassName?: string;
  showTop?: boolean;
  options: any[];
  keyName?: string;
  labelName?: string;
  value?: string | number | null;
  customizeArrow?: string | React.ReactNode;
  placeholder?: string;
  noDataMessage?: string;
  width?: string | number;
  height?: string | number;
  fullWidth?: boolean;
  // perfectScroll?: boolean;
  tabIndex?: number;
  disabled?: boolean;
  heightDropdown?: string | number;
  open?: boolean;
  keepScrollPosition?: boolean;
  resizeClose?: boolean;
  onSelection?: (value: string | number | null, selectItem?: any) => any;
  onShown?: () => void;
  onHidden?: () => void;
}

const Dropdown: React.FC<IDropdownProps> = ({
  className,
  arrowClassName,
  groupItemClassName,
  dropdownClassName,
  placeholderClassName,
  showTop = false,
  options,
  keyName = "",
  labelName = "",
  value = "",
  customizeArrow,
  placeholder = "-- Select --",
  noDataMessage = "No option",
  width = "100%",
  height = "40px",
  fullWidth = true,
  // perfectScroll = true,
  tabIndex = -1,
  disabled,
  // duration = 500,
  heightDropdown,
  // autoDirection = true,
  open,
  keepScrollPosition = true,
  resizeClose = true,
  onSelection = () => {},
  onShown = () => {},
  onHidden = () => {},
}) => {
  const resize = Hooks.useWindowSize();

  const refsButton = useRef<any>(null!);
  // const refsDropdown = useRef<any>(null!);
  // const refsScroll = useRef<any>(null!);

  const [isShow, setShow] = useState<boolean>(false);
  const [localValue, setLocalValue] = useState<string | number | null>(null);
  const [localLabel, setLocalLabel] = useState<any>(null);
  const [currentScroll, setCurrentScroll] = useState<number | null>(null);
  const [clientDropDownHeight, setclientDropDownHeight] = useState<any>(null);

  const hasKey = typeof keyName === "string" && keyName.trim() !== "";
  const hasOpts = Array.isArray(options) && options.length > 0;

  useEffect(() => setShow(!!open), [open]);

  useEffect(() => {
    const filterCondition = (item: any) => {
      return hasKey ? item[keyName] === value : item === value;
    };

    let itemData = options.find((item) => filterCondition(item));
    if (itemData) {
      setLocalLabel(hasKey ? displayObjectLabelName(itemData) : value);
      setLocalValue(getSelectedValue(value));
    }
  }, [value]);

  useEffect(() => {
    if (resizeClose && isShow) {
      beforeHide();
    }
  }, [resize]);

  Hooks.useEventListener("scroll", () => {
    beforeHide();
  });
  // Hooks.useEventListener("wheel", () => setShow(false))

  Hooks.useEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      beforeHide();
    }
  });

  Hooks.useOutsideClick(refsButton, () => beforeHide());

  const beforeHide = () => {
    setShow((pre) => {
      pre && onHidden();
      return false;
    });
  };

  const displayObjectLabelName = (value: any) => {
    return value[labelName] || value[keyName] || JSON.stringify(value);
  };

  const handleClick = () => {
    if (!hasOpts) {
      return;
    }
    let newShow = isShow ? false : true;
    newShow ? onShown() : onHidden();
    setShow(newShow);
  };

  const getSelectedValue = (value: any) => {
    let selectedValue: string | number = "";

    if (hasKey) {
      if (!(value[keyName] === undefined || value[keyName] === null)) {
        selectedValue = value[keyName];
      } else {
        // fake display
        selectedValue = JSON.stringify(value);
      }
    } else {
      selectedValue = value;
    }
    return selectedValue;
  };

  const handleSelect = (value: any) => {
    let selectedValue = getSelectedValue(value);
    setLocalLabel(hasKey ? displayObjectLabelName(value) : value);
    setLocalValue(selectedValue);
    onSelection(selectedValue, value);
    setShow(false);
  };

  return (
    <div
      ref={refsButton}
      className={HtmlUtils.joinClass("dp-dropdown2-container", className)}
      style={{ width: fullWidth ? width : "auto", height }}
    >
      <button
        className={HtmlUtils.joinClass(
          "dropdown2-button",
          !hasOpts && "dropdown2-button-nodata"
        )}
        disabled={disabled}
        onClick={handleClick}
        aria-haspopup="listbox"
      >
        {!hasOpts ? (
          <span className="dropdown2-label dropdown2-no-message">
            {noDataMessage}
          </span>
        ) : !localValue ? (
          <span
            className={HtmlUtils.joinClass(
              "dropdown2-label dropdown2-placeholder",
              placeholderClassName
            )}
          >
            {placeholder}
          </span>
        ) : (
          <span className="dropdown2-label dropdown2-selected">
            {localLabel}
          </span>
        )}
        <span className="dropdown2-anything"></span>
        <span
          className={HtmlUtils.joinClass(
            "dropdown2-arrow",
            arrowClassName,
            isShow && "dropdown2-arrow-active"
          )}
        >
          {customizeArrow}
        </span>
      </button>

      {isShow && (
        // <CSSTransition
        //   in={isShow}
        //   timeout={duration}
        //   classNames="dropdown2-transition"
        // >
        <div
          ref={(el) => {
            if (el instanceof Element) {
              keepScrollPosition &&
                setTimeout(() => {
                  el.querySelector(".scroll-content").scrollTop =
                    currentScroll || 0;
                });

              // fit height over screen
              let { bottom, top } = refsButton.current.getBoundingClientRect();
              let maxHeightSize = !showTop
                ? Math.round(window.innerHeight - bottom)
                : Math.round(top);

              if (showTop) {
                el.style.top = `${-el.clientHeight - 4}px`;
              } else {
                // el.style.top = `${refsButton.current?.offsetHeight + 4}px`
              }

              if (el.clientHeight > maxHeightSize - 8) {
                setclientDropDownHeight(`${maxHeightSize - 8}px`);
              }
            }
          }}
          tabIndex={tabIndex}
          className={HtmlUtils.joinClass(
            "dropdown2-list-items",
            dropdownClassName
          )}
          style={{
            top: refsButton.current?.offsetHeight + 4,
            width: fullWidth ? refsButton.current.offsetWidth : "auto",
          }}
          aria-expanded="true"
        >
          {/* @ts-ignore */}
          <Scrollbar2
            style={{ maxHeight: clientDropDownHeight || heightDropdown }}
            effectData={options}
            always
            wheelStop={false}
            onScrollY={(evt: any) => {
              keepScrollPosition && setCurrentScroll(evt.target.scrollTop);
            }}
          >
            <DropdownListItem />
          </Scrollbar2>
        </div>
        // </CSSTransition>
      )}
    </div>
  );

  function DropdownListItem() {
    return (
      <>
        {options.map((data, index) => {
          if (data.isGroup) {
            return (
              <React.Fragment key={index}>
                <div
                  className={HtmlUtils.joinClass(
                    "dropdown2-group-item",
                    groupItemClassName,
                    data.className
                  )}
                >
                  {data.groupName}
                </div>

                {data.items.map((sub: any, idx: number) => {
                  return <DropDownItem key={idx} item={sub} />;
                })}
              </React.Fragment>
            );
          }

          return <DropDownItem key={index} item={data} />;
        })}
      </>
    );
  }

  function DropDownItem({ item }: { item: any }) {
    const isSelected = (hasKey ? item[keyName] : item) === localValue;
    return (
      <div
        tabIndex={tabIndex}
        className={HtmlUtils.joinClass(
          "dropdown2-item",
          isSelected && "dropdown2-item-selected",
          item.className,
          item.disabled && "dropdown2-item-disabled"
        )}
        onClick={(evt) => {
          evt.preventDefault();
          !item.disabled && handleSelect(item);
        }}
        role="option"
        aria-selected={isSelected ? "true" : "false"}
      >
        <p>{hasKey ? displayObjectLabelName(item) : item}</p>
      </div>
    );
  }
};

export default Dropdown;
