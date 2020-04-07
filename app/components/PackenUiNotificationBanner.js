import React, { Component } from "react";
import { View, Image } from "react-native"

import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";

class PackenUiNotificationBanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: props.theme,
      type: props.type
    }
  }

  getIcon = () => {
    let icon = null;

    if (this.props.icon) {
      if (this.props.icon === "packen") {
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
          <Image
            style={this.getStyles().logo}
            source={src} />
        );
      } else {
        icon = (
          <Icon
            name={this.props.icon}
            size={this.getStyles().icon.base.size}
            style={{ marginRight: this.getStyles().icon.base.marginRight }}
            color={this.getStyles().icon.theme[this.state.theme].type[this.state.type].color}
          />
        )
      }
    }

    return icon;
  }

  render() {
    return (
      <View style={{
        ...this.getStyles().box.base,
        ...this.getStyles().box.theme[this.state.theme].type[this.state.type]
      }}>
        {this.getIcon()}
        <PackenUiText
          style={{
            ...this.getStyles().title.base,
            ...this.getStyles().title.theme[this.state.theme].type[this.state.type]
          }}>{this.props.title}</PackenUiText>
      </View>
    );
  }

  getStyles = () => {
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
}

export default PackenUiNotificationBanner;