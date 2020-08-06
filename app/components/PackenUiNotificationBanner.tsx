import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native"
import * as UTIL from "../utils";

import Icon from "react-native-vector-icons/Feather";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";

interface StylingPropShape {
  box: object;
  title: object;
  logo: object;
  icon: object;
  iconSize: undefined;
  iconColor: undefined;
}

interface PackenUiNotificationBannerProps {
  title: string;
  theme: string;
  type: string;
  icon: string;
  styling?: StylingPropShape;
  instance?: Function;
}

interface PackenUiNotificationBannerState {
  title: string;
  theme: string;
  type: string;
  icon: string;
  styling: StylingPropShape;
}

/**
 * Component for rendering running shipments' notification banners
 */
class PackenUiNotificationBanner extends Component<PackenUiNotificationBannerProps, PackenUiNotificationBannerState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiNotificationBannerProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     */
    this.state = { ...this.setPropsToState() }
  }

  /**
   * Propagates the component instance if a callback is provided via props
   * @type {function}
   */
  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {string} [title=""] The actual text for the component
   * @property {string} [theme="primary"] The theme to apply correct styles - "primary"; "success"; "info"; "warning"; "danger"
   * @property {string} [type="accent"] The type of component to apply correct styles - "accent"; "default"
   * @property {string} [icon="packen"] This can be either an icon name or the keyword "packen" to render accordingly
   * @property {object} [styling={ box: {}, title: {}, logo: {}, icon: {}, iconSize: undefined, iconColor: undefined }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): PackenUiNotificationBannerState => {
    return {
      title: this.props.title ? this.props.title : "",
      theme: this.props.title ? this.props.theme : "primary",
      type: this.props.title ? this.props.type : "accent",
      icon: this.props.title ? this.props.icon : "packen",
      styling: this.props.styling ? { ...this.props.styling } : {
        box: {},
        title: {},
        logo: {},
        icon: {},
        iconSize: undefined,
        iconColor: undefined
      }
    };
  }

  /**
   * Returns the correct icon or "packen" logo
   * @type {function}
   * @return {node|number} The JSX for the icon, or the number identifier for the local "packen" image source
   */
  getIcon: Function = (): ReactNode | null => {
    let icon = null;

    if (this.state.icon) {
      if (this.state.icon === "packen") {
        let src = null;
        switch (this.state.theme) {
          case "success":
            src = require("../../assets/images/arrow_packen_success.png");
            break;
          case "primary":
            src = require("../../assets/images/arrow_packen_primary.png");
            break;
          case "warning":
            src = require("../../assets/images/arrow_packen_warning.png");
            break;
          case "danger":
            src = require("../../assets/images/arrow_packen_danger.png");
            break;
          case "info":
            src = require("../../assets/images/arrow_packen_info.png");
            break;
        };

        icon = (
          <Image style={{
              ...this.getStyles().logo,
              ...this.state.styling.logo
            }} source={src} />
        );
      } else {
        icon = (
          <Icon
            name={this.state.icon}
            size={this.state.styling.iconSize ? this.state.styling.iconSize : this.getStyles().icon.base.size}
            color={this.state.styling.iconColor ? this.state.styling.iconColor : this.getStyles().icon.theme[this.state.theme].type[this.state.type].color}
            style={{ marginRight: this.getStyles().icon.base.marginRight, ...this.state.styling.icon }}
          />
        )
      }
    }

    return icon;
  }

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState: Function = () => {
    this.setState({ ...this.setPropsToState() });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiNotificationBannerProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <View style={{
        ...this.getStyles().box.base,
        ...this.getStyles().box.theme[this.state.theme].type[this.state.type],
        ...this.state.styling.box
      }}>
        {this.getIcon()}
        <PackenUiText
          style={{
            ...this.getStyles().title.base,
            ...this.getStyles().title.theme[this.state.theme].type[this.state.type],
            ...this.state.styling.title
          }}>{this.state.title}</PackenUiText>
      </View>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => {
    return {
      box: {
        base: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 4,
          flex: 1,
          width: "100%",
          minHeight: 32
        },
        theme: {
          success: {
            type: {
              default: {
                backgroundColor: Colors.success.lgt
              },
              accent: {
                backgroundColor: Colors.success.default
              }
            }
          },
          primary: {
            type: {
              default: {
                backgroundColor: Colors.brand.primary.snw
              },
              accent: {
                backgroundColor: Colors.brand.primary.drk
              }
            }
          },
          info: {
            type: {
              default: {
                backgroundColor: Colors.info.lgt
              },
              accent: {
                backgroundColor: Colors.info.default
              }
            }
          },
          warning: {
            type: {
              default: {
                backgroundColor: Colors.warning.lgt
              },
              accent: {
                backgroundColor: Colors.warning.default
              }
            }
          },
          danger: {
            type: {
              default: {
                backgroundColor: Colors.danger.lgt
              },
              accent: {
                backgroundColor: Colors.danger.default
              }
            }
          }
        }
      },
      logo: {
        width: 26,
        height: 14,
        marginRight: 8
      },
      icon: {
        base: {
          marginRight: 8,
          size: Typography.size.large
        },
        theme: {
          success: {
            type: {
              default: {
                color: Colors.success.default
              },
              accent: {
                color: Colors.basic.white.dft
              }
            }
          },
          primary: {
            type: {
              default: {
                color: Colors.brand.primary.drk
              },
              accent: {
                color: Colors.basic.white.dft
              }
            }
          },
          info: {
            type: {
              default: {
                color: Colors.info.default
              },
              accent: {
                color: Colors.basic.white.dft
              }
            }
          },
          warning: {
            type: {
              default: {
                color: Colors.warning.default
              },
              accent: {
                color: Colors.basic.white.dft
              }
            }
          },
          danger: {
            type: {
              default: {
                color: Colors.danger.default
              },
              accent: {
                color: Colors.basic.white.dft
              }
            }
          }
        }
      },
      title: {
        base: {
          fontFamily: Typography.family.semibold,
          fontSize: Typography.size.medium,
          lineHeight: Typography.lineheight.medium_alt
        },
        theme: {
          success: {
            type: {
              default: {
                color: Colors.success.default
              },
              accent: {
                color: Colors.basic.white.dft
              }
            }
          },
          primary: {
            type: {
              default: {
                color: Colors.brand.primary.drk
              },
              accent: {
                color: Colors.basic.white.dft
              }
            }
          },
          info: {
            type: {
              default: {
                color: Colors.info.default
              },
              accent: {
                color: Colors.basic.white.dft
              }
            }
          },
          warning: {
            type: {
              default: {
                color: Colors.warning.default
              },
              accent: {
                color: Colors.basic.white.dft
              }
            }
          },
          danger: {
            type: {
              default: {
                color: Colors.danger.default
              },
              accent: {
                color: Colors.basic.white.dft
              }
            }
          }
        }
      }
    };
  }

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    title: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiNotificationBanner;