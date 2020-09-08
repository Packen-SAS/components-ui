import React, { Component, ReactNode } from 'react';
import { View } from 'react-native';
import numeral from 'numeral';
import PackenUiServiceStatus from './PackenUiServiceStatus';
import typography from '../styles/abstracts/typography';
import PackenUiIconInfo from './PackenUiIconInfo';
import colors from '../styles/abstracts/colors';
import PackenUiButton from './PackenUiButton';
import PackenUiText from './PackenUiText';
import * as UTIL from '../utils';
import PackenUiTag from './PackenUiTag';

interface ShipmentShape {
  deliveries_count: number,
  model: ModelShape,
  btnText: BtnTextShape
}

interface LocationShape {
  isCurrent?: boolean;
  isComplete?: boolean;
  label: string;
  title: string;
  subtitle: string;
}

interface EventsDataInterface {
  title: string;
  subtitle: string;
}

interface ModelShape {
  shipment_id: number,
  city: string,
  client: string,
  pickup_origin: string,
  pickup_origin_extend: string,
  amount: string,
  delivered: boolean,
  details: string | boolean,
  scheduled: boolean,
  text_button: string,
  triggers: {
    view: Function,
    accept: Function
  },
  when: string | null,
  distance: string,
  timeAway: string,
  payment: {
    method: string,
    amount: number | null
  },
  content: string | null,
  comments: string | null,
  deliveries: DeliveryShape[],
  pick_date: string,
  events: EventShape[]
}

interface EventShape {
  created_at: string;
  message: string;
  time_event: string;
}

interface BtnTextShape {
  view?: string;
  accept?: string;
}

interface DeliveryShape {
  id: number;
  index: number;
  date: string;
  status: string;
  status_translate: string;
  to_contact: {
    id: number;
    full_name: string;
    company_name: string | null;
    address_1: string;
    address_2: string;
    geographic_location_id: number;
    location_data: {
      latitude: number;
      longitude: number;
    };
    geographic_location_name: string;
    phone: string;
    comments: string | null;
  }
}

interface PaymentShape {
  method: String;
  amount: number | null;
}

interface OriginShape {
  main: string;
  extra?: string;
}

interface i18nShape {
  shipment: {
    all_day_label: string;
    deliveries: string;
    delivery: string;
    date: string;
    client_label: string;
    fee_label: string;
    content_description: string;
    payment: {
      title: string;
      label: string;
    },
    comments_label: string;
    distance_away: string;
    time_away: string;
    origin: string;
    locations: string;
    events: string;
    start_label: string;
    end_label: string;
    programmed_label: string;
    instant_label: string;
    shipment_label: string;
  };
  buttons: {
    accept_shipment: string;
    view_details: string;
    
  }
}

interface PackenUiShipmentCardProps {
  i18n: i18nShape,
  shipment: ShipmentShape;
  isDetails?: boolean;
  showDetails?: boolean;
  isMyShipments?: boolean;
}

interface PackenUiShipmentCardState {
  isDetails: boolean;
  showDetails: boolean;
  isMyShipments: boolean;
  btnText: BtnTextShape;
  client: string;
  amount: string;
  events: EventShape[];
  id: number;
  content: string;
  distance: string;
  timeAway: string;
  comments: string;
  pickDate: string | null;
  deliveries: DeliveryShape[];
  payment: PaymentShape;
  viewDetails: Function;
  deliveriesCount: number;
  acceptShipment: Function;
  type: string;
  origin: OriginShape
}

class PackenUiShipmentCard extends Component<PackenUiShipmentCardProps, PackenUiShipmentCardState> {
  language = this.props.i18n;

  constructor(props: PackenUiShipmentCardProps) {
    super(props);
    this.state = { ...this.setPropsToState() };
  }

  setPropsToState: Function = (): PackenUiShipmentCardState => {
    const { deliveries_count, model, btnText } = this.props.shipment;
    return {
      isDetails: this.props.isDetails || false,
      showDetails: this.props.showDetails || false,
      isMyShipments: this.props.isMyShipments || false,
      btnText: { ...btnText } || false,
      client: model.client,
      amount: model.amount,
      events: model.events,
      id: model.shipment_id,
      content: model.content || "",
      distance: model.distance,
      timeAway: model.timeAway,
      comments: model.comments || "",
      pickDate: model.pick_date,
      deliveries: model.deliveries,
      payment: { ...model.payment },
      viewDetails: model.triggers.view,
      deliveriesCount: deliveries_count,
      acceptShipment: model.triggers.accept,
      type: model.scheduled ? 'programmed' : 'instant',
      origin: {
        main: model.pickup_origin,
        extra: model.pickup_origin_extend
      }
    };
  }

  getDeliveries: Function = (): ReactNode => {
    let content = ` - ${UTIL.toCapitalCase(this.language.shipment.all_day_label)}`;
    if (this.state.deliveriesCount > 0) {
      content = ` - ${this.state.deliveriesCount} ${(this.state.deliveriesCount > 1 ? UTIL.toCapitalCase(this.language.shipment.deliveries) : UTIL.toCapitalCase(this.language.shipment.delivery))}`;
    }
    return (
      <PackenUiText
        preset="c2"
        style={{
          ...this.getStyles().header.highlight.base,
          ...this.getStyles().header.highlight.type[this.state.type]
        }}
      >
        {content}
      </PackenUiText>
    );
  }

  getPickDate = () => {
    if (!this.state.pickDate) { return null; }
    const { day, month, nday, time, locale } = UTIL.datetime().parts(this.state.pickDate);
    const ndayFormat = UTIL.getNdayFormat(locale, nday);
    return (
      <View style={this.getStyles().body.group.base}>
        <PackenUiIconInfo
          icon="calendar"
          styling={this.getTypeStyling()}
        >
          <PackenUiText
            preset="c1"
            style={{ color: colors.basic.independence.dft }}
          >
            {this.language.shipment.date}
          </PackenUiText>
          <PackenUiText preset="p2">{`${day}, ${nday}${ndayFormat} ${month}`}</PackenUiText>
          <PackenUiText preset="c1" style={{ marginTop: 2 }}>{time}</PackenUiText>
        </PackenUiIconInfo>
      </View>
    );
  }

  getOverview = () => (
    <View style={[this.getStyles().body.section, this.getStyles().body.overview]}>
      <View style={{
        ...this.getStyles().body.group.base,
        ...this.getStyles().body.client[this.state.type]
      }}
      >
        <PackenUiText
          preset="c1"
          style={this.getStyles().body.label}
        >
          {this.language.shipment.client_label}
        </PackenUiText>
        <PackenUiText preset="p1">
          {UTIL.toTitleCase(this.state.client)}
        </PackenUiText>
      </View>
      {this.getPickDate()}
      <View style={[this.getStyles().body.group.base, this.getStyles().body.group.right]}>
        <PackenUiText
          preset="c1"
          style={this.getStyles().body.label}
        >
          {this.language.shipment.fee_label}
        </PackenUiText>
        <PackenUiText
          preset="t1"
          style={this.getStyles().body.fee}
        >
          {numeral(this.state.amount).format('$ 0,0[.]00')}
        </PackenUiText>
      </View>
    </View>
  );

  getDescription = () => {
    if (!this.state.isDetails) { return null; }
    return (
      <View style={this.getStyles().body.section}>
        <View
          style={{
            ...this.getStyles().body.group.base,
            ...this.getStyles().body.description
          }}
        >
          <PackenUiText
            preset="c1"
            style={this.getStyles().body.label}
          >
            {this.language.shipment.content_description}
          </PackenUiText>
          <PackenUiText preset="p1">
            {UTIL.toCapitalCase(this.state.content)}
          </PackenUiText>
        </View>
      </View>
    );
  }

  getPaymentProps = () => {
    let key = '';
    let icon = '';
    let iconSet = 'FTR';
    let customStyling = {};
    switch (this.state.payment.method.toUpperCase()) {
      case 'EFECTIVO':
        key = 'cash';
        icon = 'money';
        iconSet = 'FA';
        break;
      case 'TRANSFERENCIA/CONSIGNACIÓN EN BANCO':
        key = 'transfer';
        icon = 'bank-transfer';
        iconSet = 'MCI';
        customStyling = { copy: { marginLeft: -2 } };
        break;
      case 'TARJETA DE CRÉDITO':
        key = 'card';
        icon = 'credit-card';
        break;
      default:
        break;
    }
    const styling = {
      title: {
        fontSize: 10,
        color: colors.basic.independence.drk
      },
      ...customStyling,
      iconColor: key === 'cash'
        ? colors.success.default
        : this.state.type === 'programmed'
          ? colors.brandSecondary.default
          : colors.brand.primary.drk
    };
    let { title } = this.language.shipment.payment[key];
    if (this.state.payment.amount) {
      delete styling.title.fontSize;
      title = numeral(this.state.payment.amount).format('$ 0,0[.]00');
    }
    return {
      iconSet,
      icon,
      title,
      styling,
      label: this.language.shipment.payment[key].label
    };
  }

  getTypeStyling = () => (this.state.type === 'programmed' ? { iconColor: colors.brandSecondary.default } : {});

  getComments = () => {
    if (this.state.comments && this.state.isDetails) {
      return (
        <View style={this.getStyles().body.section}>
          <View style={{
            ...this.getStyles().body.group.base,
            ...this.getStyles().body.comments
          }}
          >
            <PackenUiText
              preset="c1"
              style={this.getStyles().body.label}
            >
              {this.language.shipment.comments_label}
            </PackenUiText>
            <PackenUiText preset="c1" style={{ color: colors.basic.independence.lgt }}>
              {UTIL.toCapitalCase(this.state.comments)}
            </PackenUiText>
          </View>
        </View>
      );
    } return null;
  }

  getDetails = () => (
    <View style={[this.getStyles().body.section, this.getStyles().body.details]}>
      <View style={this.getStyles().body.group.base}>
        <PackenUiIconInfo icon="map" label={this.language.shipment.distance_away} title={this.state.distance} styling={this.getTypeStyling()} disabled />
      </View>
      <View style={this.getStyles().body.group.base}>
        <PackenUiIconInfo icon="clock" label={this.language.shipment.time_away} title={this.state.timeAway} styling={this.getTypeStyling()} disabled />
      </View>
      <View style={this.getStyles().body.group.base}>
        <PackenUiIconInfo {...this.getPaymentProps()} />
      </View>
    </View>
  );

  getLocationsData = () => {
    const locations:LocationShape[] = [{
      isCurrent: true,
      label: this.language.shipment.origin,
      title: UTIL.toCapitalCase(this.state.origin.main),
      subtitle: UTIL.toCapitalCase(this.state.origin.extra)
    }];
    if (this.state.isDetails) {
      this.state.deliveries.forEach((item, i) => {
        const { address_1, address_2 } = item.to_contact;
        locations.push({
          label: `${UTIL.toCapitalCase(this.language.shipment.delivery)} ${UTIL.num2ltr(i + 1)}`,
          title: UTIL.toCapitalCase(address_1),
          subtitle: UTIL.toCapitalCase(address_2)
        });
      });
    }
    return locations;
  }

  getLocations = () => (
    <View style={[this.getStyles().body.section, this.getStyles().body.locations]}>
      <PackenUiText
        preset="c1"
        style={{
          ...this.getStyles().body.label,
          fontFamily: typography.family.bold,
          color: colors.basic.independence.drk
        }}
      >
        {this.language.shipment.locations}
      </PackenUiText>
      <View style={{ width: '100%', marginTop: 5 }}>
        <PackenUiServiceStatus
          altStyle
          currentStepIndex={0}
          steps={this.getLocationsData()}
        />
      </View>
    </View>
  );

  getStartEndDates = () => {
    if (!this.state.isDetails || !this.state.events || !this.state.events.length) { return null; }
    const startDate = this.state.events[0].created_at;
    const endDate = this.state.events[this.state.events.length - 1].created_at;
    const startDateParts = UTIL.datetime().parts(startDate);
    const ndayFormatStart = UTIL.getNdayFormat(startDateParts.locale, startDateParts.nday);
    const endDateParts = UTIL.datetime().parts(endDate);
    const ndayFormatEnd = UTIL.getNdayFormat(endDateParts.locale, endDateParts.nday);
    return (
      <>
        <PackenUiText
          preset="c1"
          style={{
            ...this.getStyles().body.label,
            fontFamily: typography.family.bold,
            color: colors.basic.independence.drk,
            marginBottom: 8
          }}
        >
          {this.language.shipment.events}
        </PackenUiText>
        <View style={[this.getStyles().body.section, this.getStyles().body.dates]}>
          <View style={{ flex: 1 }}>
            <PackenUiIconInfo
              iconSet="MCI"
              icon="ray-start"
              styling={this.getTypeStyling()}
            >
              <PackenUiText
                preset="c1"
                style={{ color: colors.basic.independence.dft }}
              >
                {this.language.shipment.start_label}
              </PackenUiText>
              <PackenUiText preset="p2">{`${startDateParts.day}, ${startDateParts.nday}${ndayFormatStart} ${startDateParts.month}`}</PackenUiText>
              <PackenUiText preset="c1" style={{ marginTop: 2 }}>{startDateParts.time}</PackenUiText>
            </PackenUiIconInfo>
          </View>
          <View style={{ flex: 1 }}>
            <PackenUiIconInfo
              iconSet="MCI"
              icon="ray-end"
              styling={this.getTypeStyling()}
            >
              <PackenUiText
                preset="c1"
                style={{ color: colors.basic.independence.dft }}
              >
                {this.language.shipment.end_label}
              </PackenUiText>
              <PackenUiText preset="p2">{`${endDateParts.day}, ${endDateParts.nday}${ndayFormatEnd} ${endDateParts.month}`}</PackenUiText>
              <PackenUiText preset="c1" style={{ marginTop: 2 }}>{endDateParts.time}</PackenUiText>
            </PackenUiIconInfo>
          </View>
        </View>
        {this.getEvents()}
      </>
    );
  }

  getEventsData = () => {
    const events:EventsDataInterface[] = [];
    this.state.events.forEach((item) => {
      const { message, time_event } = item;
      events.push({
        title: UTIL.toCapitalCase(message),
        subtitle: UTIL.toCapitalCase(time_event)
      });
    });
    return events;
  }

  getEvents = () => (
    <View style={[this.getStyles().body.section, this.getStyles().body.locations]}>
      <View style={{ width: '100%', marginTop: 5 }}>
        <PackenUiServiceStatus
          altStyle
          currentStepIndex={0}
          steps={this.getEventsData()}
        />
      </View>
    </View>
  );

  getCta = () => {
    if (this.state.isDetails) { return null; }
    return (
      <View style={[this.getStyles().body.section, this.getStyles().body.cta]}>
        {
          !this.state.isMyShipments ? (
            <View style={{
              ...this.getStyles().body.group.base,
              paddingRight: 3
            }}
            >
              <PackenUiButton
                size="tiny"
                level="secondary"
                type="regular"
                callback={this.state.acceptShipment}
                styling={{ shape: { paddingHorizontal: 0, paddingVertical: 10 } }}
              >
                {this.state.btnText.accept || this.language.buttons.accept_shipment}
              </PackenUiButton>
            </View>
          ) : null
        }
        <View style={{
          ...this.getStyles().body.group.base,
          width: this.state.isMyShipments ? '100%' : 'auto',
          paddingLeft: this.state.isMyShipments ? 0 : 3
        }}
        >
          <PackenUiButton
            size="tiny"
            level={this.state.type === 'programmed' ? 'brandSecondary' : 'primary'}
            type="regular"
            callback={this.state.viewDetails}
            styling={{ shape: { paddingHorizontal: 0, paddingVertical: 11 } }}
          >
            {this.state.btnText.view || this.language.buttons.view_details}
          </PackenUiButton>
        </View>
      </View>
    );
  }

  getShipmentTypeLabel = () => (this.state.type === 'programmed' ? this.language.shipment.programmed_label : this.language.shipment.instant_label);

  updateState = () => { this.setState({ ...this.setPropsToState() }); }

  componentDidUpdate = (prevProps: PackenUiShipmentCardProps) => {
    if (!UTIL.objectsEqual(prevProps, this.props)) { this.updateState(); }
  }

  render() {
    return (
      <View style={this.getStyles().container}>
        <View style={{
          ...this.getStyles().header.box.base,
          ...this.getStyles().header.box.type[this.state.type]
        }}
        >
          <View style={this.getStyles().header.inline}>
            <PackenUiText
              preset="c2"
              style={{
                ...this.getStyles().header.label.base,
                ...this.getStyles().header.label.type[this.state.type]
              }}
            >
              {this.language.shipment.shipment_label.toUpperCase()}
              {' '}
              #
              {this.state.id}
            </PackenUiText>
            {this.getDeliveries()}
          </View>
          <PackenUiTag
            textColor={colors.brand.primary.drk}
            backgroundColor={colors.brand.primary.ulgt}
            styling={{
              box: {
                ...this.getStyles().header.tag.box.base,
                ...this.getStyles().header.tag.box.type[this.state.type]
              },
              label: {
                ...this.getStyles().header.tag.label.base,
                ...this.getStyles().header.tag.label.type[this.state.type]
              }
            }}
          >
            {UTIL.toCapitalCase(this.getShipmentTypeLabel())}
          </PackenUiTag>
        </View>
        <View style={this.getStyles().body.box}>
          {this.getOverview()}
          {this.getDescription()}
          <View style={{
            ...this.getStyles().body.fold.base,
            ...this.getStyles().body.fold.visible[this.state.showDetails.toString()]
          }}
          >
            {this.getComments()}
            {this.getDetails()}
            {this.getLocations()}
            {this.getStartEndDates()}
            {this.getCta()}
          </View>
        </View>
      </View>
    );
  }

  getStyles: Function = (): object => ({
    container: {
      width: '100%',
      backgroundColor: colors.basic.white.dft
    },
    header: {
      box: {
        base: {
          paddingVertical: 6,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        },
        type: {
          programmed: {
            backgroundColor: UTIL.hex2rgba(colors.brand.secondary.dft, 0.1)
          },
          instant: {
            backgroundColor: UTIL.hex2rgba(colors.brand.primary.snw, 0.5)
          }
        }
      },
      inline: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
      label: {
        base: {
          fontFamily: typography.family.semibold
        },
        type: {
          programmed: {
            color: colors.brand.secondary.lgt
          },
          instant: {
            color: colors.basic.gray.drk
          }
        }
      },
      highlight: {
        base: {
          fontFamily: typography.family.semibold
        },
        type: {
          programmed: {
            color: colors.brand.secondary.dft
          },
          instant: {
            color: colors.brand.primary.drk
          }
        }
      },
      tag: {
        box: {
          base: {
            paddingTop: 1,
            borderRadius: 4,
            paddingBottom: 2
          },
          type: {
            programmed: {
              backgroundColor: colors.brand.secondary.dft
            },
            instant: {}
          }
        },
        label: {
          base: {
            ...typography.c1
          },
          type: {
            programmed: {
              color: colors.basic.white.dft
            },
            instant: {}
          }
        }
      }
    },
    body: {
      box: {
        width: '100%',
        paddingTop: 11,
        paddingBottom: this.state.isDetails ? 0 : 16,
        paddingHorizontal: 20,
        backgroundColor: colors.basic.white.dft
      },
      section: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start'
      },
      group: {
        base: {},
        right: {
          alignItems: 'flex-end'
        }
      },
      label: {
        marginBottom: 2,
        color: colors.basic.independence.dft
      },
      client: {
        programmed: {
          maxWidth: '20%'
        },
        instant: {}
      },
      fee: {
        fontFamily: typography.family.bold
      },
      overview: {
        marginBottom: 12,
        justifyContent: 'space-between'
      },
      fold: {
        base: {},
        visible: {
          true: { display: 'flex' },
          false: { display: 'none' }
        }
      },
      description: {
        flex: 1,
        marginBottom: 12
      },
      comments: {
        flex: 1,
        marginBottom: 20
      },
      details: {
        marginBottom: 20,
        justifyContent: 'space-between'
      },
      dates: {
        marginBottom: 12
      },
      events: {
        marginBottom: 20
      },
      locations: {
        marginBottom: 22,
        flexDirection: 'column'
      },
      cta: {}
    },
  });
}

export default PackenUiShipmentCard;