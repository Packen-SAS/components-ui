import React, { Component, ReactNode } from 'react';
import { View } from 'react-native';
import PropTypes from "prop-types";
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
  shipment_id: number;
  city: string;
  client: string;
  pickup_origin: string;
  pickup_origin_extend: string;
  amount: string;
  delivered: boolean;
  details: string | boolean;
  scheduled: boolean;
  text_button: string;
  triggers: {
    view: Function;
    accept: Function;
    reject: Function;
  };
  when: string | null;
  distance: string;
  timeAway: string;
  payment: {
    method: string;
    amount: number | null;
  };
  content: string | null;
  comments: string | null;
  deliveries: DeliveryShape[];
  pick_date: string;
  events: EventShape[];
  status: string;
}

interface EventShape {
  created_at: string;
  message: string;
  time_event: string;
}

interface BtnTextShape {
  view?: string;
  accept?: string;
  reject?: string;
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
  method: string;
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
    cancel: string;
  }
}

interface StylingPropShape {
  container?: object;
  header?: {
    box?: object;
    inline?: object;
    label?: object;
  }
  tag?: {
    box?: object;
    label?: object;
  };
  body?: {
    box?: object;
    fold?: object;
    section?: object;
    overview?: object;
    group?: object;
    client?: object;
    label?: object;
    fee?: object;
    description?: object;
    details?: object;
    comments?: object;
    locations?: object;
    dates?: object;
    cta?: object;
  }
}

interface PackenUiShipmentCardProps {
  i18n: i18nShape,
  shipment: ShipmentShape;
  isDetails?: boolean;
  showDetails?: boolean;
  isMyShipments?: boolean;
  styling?: StylingPropShape;
}

interface PackenUiShipmentCardState {
  isDetails: boolean;
  showDetails: boolean;
  isMyShipments: boolean;
  btnText: BtnTextShape;
  client: string;
  amount: string;
  events: EventShape[];
  status: string;
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
  rejectShipment: Function;
  type: string;
  origin: OriginShape;
  styling: StylingPropShape;
}

/**
 * Component for rendering a shipment's details in a card
 */
class PackenUiShipmentCard extends Component<PackenUiShipmentCardProps, PackenUiShipmentCardState> {
  /**
   * Variable that holds the i18n json data
   * @type {object}
   */
  language: i18nShape = this.props.i18n;

  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiShipmentCardProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     */
    this.state = { ...this.setPropsToState() };
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {boolean} [isDetails=false] Whether the component is being used as part of a details view
   * @property {boolean} [showDetails=false] Whether to show the content "below the fold" when being used as part of a details view
   * @property {boolean} [isMyShipments=false] Whether the component is being used as part of a historical shipments view
   * @property {object|boolean} [btnText=false] Optional custom text for the "accept" and "view" buttons
   * @property {string} [model.client=undefined] The client name
   * @property {string} [model.amount=undefined] The shipment fee
   * @property {object[]} [model.events=undefined] The shipment events if it's already delivered
   * @property {string} [model.status=undefined] The shipment current status
   * @property {number} [model.id=undefined] The unique shipment id
   * @property {string} [model.content=undefined] The shipment description
   * @property {string} [model.distance=undefined] The total distance between all shipment locations
   * @property {string} [model.timeAway=undefined] The total time to travel between all shipment locations
   * @property {string|null} [model.comments=undefined] The shipment extra comments
   * @property {string} [model.pickDate=undefined] The shipment pickup date
   * @property {object[]|null} [model.deliveries=undefined] The shipment deliveries
   * @property {object} [model.payment=undefined] The payment method data object
   * @property {Function} [model.viewDetails=undefined] The callback function to trigger when pressing on the "view" button
   * @property {number} [model.deliveriesCount=undefined] The number of deliveries for the shipment
   * @property {Function} [model.acceptShipment=undefined] The callback function to trigger when pressing on the "accept" button
   * @property {Function} [model.rejectShipment=undefined] The callback function to trigger when pressing on the "reject" button
   * @property {string} [model.type=undefined] The type of shipment
   * @property {string} [model.pickup_origin=undefined] The main address for the pickup location
   * @property {string} [model.pickup_origin_extend=undefined] The extra address for the pickup location
   * @property {object} [styling={ container: {},header: { box: {}, inline: {}, label: {} },tag: { box: {},  label: {} }, body: { box: {}, fold: {}, section: {}, overview: {}, group: {}, client: {}, label: {}, fee: {}, description: {}, details: {}, comments: {}, locations: {}, dates: {}, cta: {}} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
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
      status: model.status,
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
      rejectShipment: model.triggers.reject,
      type: model.scheduled ? 'programmed' : 'instant',
      origin: {
        main: model.pickup_origin,
        extra: model.pickup_origin_extend
      },
      styling: this.props.styling || {
        container: {},
        header: {
          box: {},
          inline: {},
          label: {}
        },
        tag: {
          box: {},
          label: {}
        },
        body: {
          box: {},
          fold: {},
          section: {},
          overview: {},
          group: {},
          client: {},
          label: {},
          fee: {},
          description: {},
          details: {},
          comments: {},
          locations: {},
          dates: {},
          cta: {}
        }
      }
    };
  }

  /**
   * Returns the number of deliveries as a {@link PackenUiText} component
   * @type {Function}
   * @return {node} JSX for the deliveries element
   */
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

  /**
   * Returns the pickup date when it's a programmed shipment as a {@link PackenUiIconInfo} component
   * @type {Function}
   * @return {node|null} JSX for the pickup date element or null
   */
  getPickDate: Function = (): ReactNode | null => {
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

  /**
   * Returns the main, "above the fold," overview element which contains the client name and shipment fee
   * @type {Function}
   * @return {node} JSX for the overview elements
   */
  getOverview: Function = (): ReactNode => (
    <View style={{
      ...this.getStyles().body.section,
      ...this.state.styling.body?.section,
      ...this.getStyles().body.overview,
      ...this.state.styling.body?.overview
    }}>
      <View style={{
        ...this.getStyles().body.group.base,
        ...this.state.styling.body?.group,
        ...this.getStyles().body.client[this.state.type],
        ...this.state.styling.body?.client
      }}
      >
        <PackenUiText
          preset="c1"
          style={{
            ...this.getStyles().body.label,
            ...this.state.styling.body?.label
          }}
        >
          {this.language.shipment.client_label}
        </PackenUiText>
        <PackenUiText preset="p1">
          {UTIL.toTitleCase(this.state.client)}
        </PackenUiText>
      </View>
      {this.getPickDate()}
      <View style={{
        ...this.getStyles().body.group.base,
        ...this.state.styling.body?.group,
        ...this.getStyles().body.group.right
      }}>
        <PackenUiText
          preset="c1"
          style={{
            ...this.getStyles().body.label,
            ...this.state.styling.body?.label
          }}
        >
          {this.language.shipment.fee_label}
        </PackenUiText>
        <PackenUiText
          preset="t1"
          style={{
            ...this.getStyles().body.fee,
            ...this.state.styling.body?.fee
          }}
        >
          {numeral(this.state.amount).format('$ 0,0[.]00')}
        </PackenUiText>
      </View>
    </View>
  );

  /**
   * Returns the shipment description element if data is available
   * @type {Function}
   * @return {node|null} JSX for the description elements or null
   */
  getDescription: Function = (): ReactNode | null => {
    if (!this.state.isDetails) { return null; }
    return (
      <View style={{
        ...this.getStyles().body.section,
        ...this.state.styling.body?.section
      }}>
        <View
          style={{
            ...this.getStyles().body.group.base,
            ...this.state.styling.body?.group,
            ...this.getStyles().body.description,
            ...this.state.styling.body?.description
          }}
        >
          <PackenUiText
            preset="c1"
            style={{
              ...this.getStyles().body.label,
              ...this.state.styling.body?.label
            }}
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

  /**
   * Returns the {@link PackenUiIconInfo} props used specifically for the payment method element
   * @type {Function}
   * @return {object} The correct props for the component instance
   */
  getPaymentProps: Function = (): object => {
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

  /**
   * Returns the correct color for a {@link PackenUiIconInfo} depending on the shipment type
   * @type {Function}
   * @return {object} The custom styling prop with correct icon color passed to the component instance
   */
  getTypeStyling: Function = (): Object => (this.state.type === 'programmed' ? { iconColor: colors.brandSecondary.default } : {});

  /**
   * Returns the comments elements if data is provided
   * @type {Function}
   * @return {node|null} JSX for the comments elements or null
   */
  getComments: Function = (): ReactNode | null => {
    if (this.state.comments && this.state.isDetails) {
      return (
        <View style={{
          ...this.getStyles().body.section,
          ...this.state.styling.body?.section
        }}>
          <View style={{
            ...this.getStyles().body.group.base,
            ...this.state.styling.body?.group,
            ...this.getStyles().body.comments,
            ...this.state.styling.body?.comments
          }}
          >
            <PackenUiText
              preset="c1"
              style={{
                ...this.getStyles().body.label,
                ...this.state.styling.body?.label
              }}
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

  /**
   * Returns the details elements (distance, time away, and payment method)
   * @type {Function}
   * @return {node} JSX for the details elements
   */
  getDetails: Function = (): ReactNode => (
    <View style={{
      ...this.getStyles().body.section,
      ...this.state.styling.body?.section,
      ...this.getStyles().body.details,
      ...this.state.styling.body?.details
    }}>
      <View style={{
        ...this.getStyles().body.group.base,
        ...this.state.styling.body?.group
      }}>
        <PackenUiIconInfo icon="map" label={this.language.shipment.distance_away} title={this.state.distance} styling={this.getTypeStyling()} disabled />
      </View>
      <View style={{
        ...this.getStyles().body.group.base,
        ...this.state.styling.body?.group
      }}>
        <PackenUiIconInfo icon="clock" label={this.language.shipment.time_away} title={this.state.timeAway} styling={this.getTypeStyling()} disabled />
      </View>
      <View style={{
        ...this.getStyles().body.group.base,
        ...this.state.styling.body?.group
      }}>
        <PackenUiIconInfo {...this.getPaymentProps()} />
      </View>
    </View>
  );

  /**
   * Returns the data required by the {@link PackenUiServiceStatus} component used for rendering the locations
   * @type {Function}
   * @return {object[]} The "steps" prop for the component instance
   */
  getLocationsData: Function = (): object[] => {
    const locations: LocationShape[] = [{
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

  /**
   * Returns the {@link PackenUiServiceStatus} for rendering the shipment origin and deliveries
   * @type {Function}
   * @return {node} JSX for the elements
   */
  getLocations: Function = (): ReactNode => (
    <View style={{
      ...this.getStyles().body.section,
      ...this.state.styling.body?.section,
      ...this.getStyles().body.locations,
      ...this.state.styling.body?.locations
    }}>
      <PackenUiText
        preset="c1"
        style={{
          ...this.getStyles().body.label,
          ...this.state.styling.body?.label,
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

  /**
   * Returns the {@link PackenUiServiceStatus} and {@link PackenUiIconInfo} components for rendering the start/end dates and events for delivered shipments
   * @type {Function}
   * @return {node} JSX for the elements
   */
  getStartEndDates: Function = (): ReactNode => {
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
            ...this.state.styling.body?.label,
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

  /**
   * Returns the data required by the {@link PackenUiServiceStatus} component used for rendering the shipment events
   * @type {Function}
   * @return {object[]} The "steps" prop for the component instance
   */
  getEventsData: Function = (): object[] => {
    const events: EventsDataInterface[] = [];
    this.state.events.forEach((item) => {
      const { message, time_event } = item;
      events.push({
        title: UTIL.toCapitalCase(message),
        subtitle: UTIL.toCapitalCase(time_event)
      });
    });
    return events;
  }

  /**
   * Returns the {@link PackenUiServiceStatus} for rendering the shipment events if already delivered
   * @type {Function}
   * @return {node} JSX for the elements
   */
  getEvents: Function = (): ReactNode => (
    <View style={{
      ...this.getStyles().body.section,
      ...this.state.styling.body?.section,
      ...this.getStyles().body.locations,
      ...this.state.styling.body?.locations
    }}>
      <View style={{ width: '100%', marginTop: 5 }}>
        <PackenUiServiceStatus
          altStyle
          currentStepIndex={0}
          steps={this.getEventsData()}
        />
      </View>
    </View>
  );

  /**
   * Returns the cta elements if it's not part of an inner details view
   * @type {Function}
   * @return {node|null} JSX for the elements or null
   */
  getCta: Function = (): ReactNode | null => {
    if (this.state.isDetails) { return null; }
    return (
      <View style={{
        ...this.getStyles().body.section,
        ...this.state.styling.body?.section,
        ...this.getStyles().body.cta,
        ...this.state.styling.body?.cta
      }}>
        {
          !this.state.isMyShipments ? (
            <View style={{
              ...this.getStyles().body.group.base,
              ...this.state.styling.body?.group,
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
          ) : this.state.type === "programmed" && this.state.status !== "delivered" ? (
            <View style={{
              ...this.getStyles().body.group.base,
              paddingRight: 3
            }}
            >
              <PackenUiButton
                isOutline
                size="tiny"
                level="danger"
                type="regular"
                callback={this.state.rejectShipment}
                styling={{ shape: { paddingHorizontal: 0, paddingVertical: 10 } }}
              >
                {this.state.btnText.reject || this.language.buttons.cancel}
              </PackenUiButton>
            </View>
          ) : null
        }
        <View style={{
          ...this.getStyles().body.group.base,
          ...this.state.styling.body?.group,
          width: this.state.type === "programmed"
            ? this.state.status === "delivered"
              ? "100%"
              : "auto"
            : this.state.isMyShipments
              ? "100%"
              : "auto",
          paddingLeft: this.state.isMyShipments ? 0 : 3
        }}
        >
          <PackenUiButton
            size="tiny"
            level={this.state.type === "programmed" ? "brandSecondary" : "primary"}
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

  /**
   * Returns the i18n label depending on the type of shipment
   * @type {Function}
   * @return {string} The correct i18n label for the type of shipment
   */
  getShipmentTypeLabel: Function = (): string => (this.state.type === 'programmed' ? this.language.shipment.programmed_label : this.language.shipment.instant_label);

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState: Function = () => { this.setState({ ...this.setPropsToState() }); }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiShipmentCardProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) { this.updateState(); }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <View style={{
        ...this.getStyles().container,
        ...this.state.styling.container
      }}>
        <View style={{
          ...this.getStyles().header.box.base,
          ...this.getStyles().header.box.type[this.state.type],
          ...this.state.styling.header?.box
        }}
        >
          <View style={this.getStyles().header.inline}>
            <PackenUiText
              preset="c2"
              style={{
                ...this.getStyles().header.label.base,
                ...this.getStyles().header.label.type[this.state.type],
                ...this.state.styling.header?.label
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
                ...this.getStyles().header.tag.box.type[this.state.type],
                ...this.state.styling.tag?.box
              },
              label: {
                ...this.getStyles().header.tag.label.base,
                ...this.getStyles().header.tag.label.type[this.state.type],
                ...this.state.styling.tag?.label
              }
            }}
          >
            {UTIL.toCapitalCase(this.getShipmentTypeLabel())}
          </PackenUiTag>
        </View>
        <View style={{
          ...this.getStyles().body.box,
          ...this.state.styling.body?.box
        }}>
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

  /**
   * Returns the styles object
   * @type {function}
   * @return {object} The styles object
   */
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

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    i18n: PropTypes.shape({
      shipment: PropTypes.shape({
        all_day_label: PropTypes.string,
        deliveries: PropTypes.string,
        delivery: PropTypes.string,
        date: PropTypes.string,
        client_label: PropTypes.string,
        fee_label: PropTypes.string,
        content_description: PropTypes.string,
        payment: PropTypes.shape({
          title: PropTypes.string,
          label: PropTypes.string
        }).isRequired,
        comments_label: PropTypes.string,
        distance_away: PropTypes.string,
        time_away: PropTypes.string,
        origin: PropTypes.string,
        locations: PropTypes.string,
        events: PropTypes.string,
        start_label: PropTypes.string,
        end_label: PropTypes.string,
        programmed_label: PropTypes.string,
        instant_label: PropTypes.string,
        shipment_label: PropTypes.string
      }).isRequired,
      buttons: PropTypes.shape({
        accept_shipment: PropTypes.string,
        view_details: PropTypes.string
      }).isRequired
    }).isRequired,
    isDetails: PropTypes.bool,
    showDetails: PropTypes.bool,
    isMyShipments: PropTypes.bool,
    shipment: PropTypes.shape({
      deliveries_count: PropTypes.number.isRequired,
      btnText: PropTypes.shape({
        view: PropTypes.string,
        accept: PropTypes.string
      }),
      model: PropTypes.shape({
        shipment_id: PropTypes.number.isRequired,
        city: PropTypes.string.isRequired,
        client: PropTypes.string.isRequired,
        pickup_origin: PropTypes.string.isRequired,
        pickup_origin_extend: PropTypes.string,
        amount: PropTypes.string.isRequired,
        delivered: PropTypes.bool.isRequired,
        details: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        scheduled: PropTypes.bool.isRequired,
        text_button: PropTypes.string,
        triggers: PropTypes.shape({
          view: PropTypes.func,
          accept: PropTypes.func
        }),
        when: PropTypes.string,
        distance: PropTypes.string.isRequired,
        timeAway: PropTypes.string.isRequired,
        payment: PropTypes.shape({
          method: PropTypes.string.isRequired,
          amount: PropTypes.number
        }),
        content: PropTypes.string,
        comments: PropTypes.string,
        deliveries: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.number.isRequired,
          index: PropTypes.number.isRequired,
          date: PropTypes.string.isRequired,
          status: PropTypes.string.isRequired,
          status_translate: PropTypes.string.isRequired,
          to_contact: PropTypes.shape({
            id: PropTypes.number,
            full_name: PropTypes.string,
            company_name: PropTypes.string,
            address_1: PropTypes.string.isRequired,
            address_2: PropTypes.string,
            geographic_location_id: PropTypes.number.isRequired,
            location_data: PropTypes.shape({
              latitude: PropTypes.number.isRequired,
              longitude: PropTypes.number.isRequired,
            }).isRequired,
            geographic_location_name: PropTypes.string,
            phone: PropTypes.string,
            comments: PropTypes.string,
          }).isRequired
        })),
        pick_date: PropTypes.string,
        events: PropTypes.arrayOf(PropTypes.shape({
          created_at: PropTypes.string.isRequired,
          message: PropTypes.string.isRequired,
          time_event: PropTypes.string.isRequired
        }))
      }).isRequired,
    }).isRequired
  }
}

export default PackenUiShipmentCard;