import PackenUiShipmentCard from "../../app/components/PackenUiShipmentCard";
import { shallow } from "enzyme";
import React from "react";

describe("<PackenUiShipmentCard/>", () => {
  let render, instance;
  const mockCall = jest.fn();
  const mockView = jest.fn();
  const mockAccept = jest.fn();
  const mockReject = jest.fn();
  const mockMessage = jest.fn();
  const i18n = {
    shipment: {
      all_day_label: "test",
      deliveries: "test",
      delivery: "test",
      date: "test",
      client_label: "test",
      fee_label: "test",
      content_description: "test",
      payment: {
        cash: {
          title: "test",
          label: "test",
        },
        transfer: {
          title: "test",
          label: "test",
        },
        card: {
          title: "test",
          label: "test",
        },
        credit: {
          title: "test",
          label: "test",
        },
        undefined: {
          title: "test",
          label: "test"
        }
      },
      comments_label: "test",
      distance_away: "test",
      time_away: "test",
      origin: "test",
      locations: "test",
      events: "test",
      start_label: "test",
      end_label: "test",
      programmed_label: "test",
      instant_label: "test",
      shipment_label: "test",
    },
    buttons: {
      accept_shipment: "test",
      view_details: "test",
      cancel: "test",
    }
  };
  const shipment = {
    deliveries_count: 2,
    model: {
      client: "test",
      amount: "9375",
      events: [],
      status: "moving",
      shipment_id: 1234,
      content: "test",
      distance: "1km",
      timeAway: "00h:05m",
      comments: "test",
      pickDate: "01-12-2020T08:00:00-05:00",
      deliveries: [
        {
          id: 1234,
          index: 1,
          date: "01-12-2020T10:00:00-05:00",
          status: "picking",
          status_translate: "Recogiendo",
          to_contact: {
            id: 1234,
            full_name: "test",
            company_name: "test",
            address_1: "test",
            address_2: "test",
            geographic_location_id: 1,
            location_data: {
              latitude: 1234,
              longitude: 4321,
            },
            geographic_location_name: "test",
            phone: "1234567890",
            comments: "test"
          }
        },
        {
          id: 4321,
          index: 1,
          date: "01-12-2020T10:00:00-05:00",
          status: "picking",
          status_translate: "Recogiendo",
          to_contact: {
            id: 4321,
            full_name: "test",
            company_name: "test",
            address_1: "test",
            address_2: "test",
            geographic_location_id: 1,
            location_data: {
              latitude: 1234,
              longitude: 4321,
            },
            geographic_location_name: "test",
            phone: "1234567890",
            comments: "test"
          }
        }
      ],
      payment: {
        method: "efectivo",
        title: "test"
      },
      scheduled: false,
      city: "test",
      pickup_origin: "test",
      pickup_origin_extend: "test",
      triggers: {
        call: mockCall,
        view: mockView,
        accept: mockAccept,
        reject: mockReject,
        message: mockMessage
      }
    }
  };
  beforeAll(() => {
    render = shallow(<PackenUiShipmentCard i18n={i18n} shipment={shipment} />);
    instance = render.instance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("returns the number of deliveries as a text component", () => {
      [0, 2, 1].forEach((qty) => {
        instance.setState({ deliveriesCount: qty });
        const res = instance.getDeliveries();
        expect(res).toBeDefined();
      });
    });

    it("returns the pickup date elements for programmed shipments", () => {
      instance.setState({ isRunning: true });
      const res = instance.getPickDate();
      expect(res).toBeNull();

      [null, shipment.model.pickDate].forEach((date) => {
        instance.setState({ pickDate: date, isRunning: false });
        const _res = instance.getPickDate();
        if (date) {
          expect(_res).toBeDefined();
        } else {
          expect(_res).toBeNull();
        }
      });
    });

    it("returns the user actions elements", () => {
      instance.setState({ hideActions: true });
      const res = instance.getActions();
      expect(res).toBeNull();

      [
        { type: "programmed", step: 0 },
        { type: "instant", step: 1 }
      ].forEach((config) => {
        instance.setState({
          type: config.type,
          hideActions: false,
          runningCurrentStep: config.step
        });
        const _res = instance.getActions();
        expect(_res).toBeDefined();
        if (config.step === 0) {
          expect(_res.props.children[2]).toBeDefined();
        } else {
          expect(_res.props.children[2]).toBeNull();
        }
      });
    });

    it("returns the data used to render the locations list component", () => {
      [true, false].forEach((state) => {
        const origin = { ...instance.state.origin };
        origin.city = state ? null : "test";
        const deliveries = [...instance.state.deliveries];
        deliveries[0].to_contact.geographic_location_name = state ? null : "test";
        instance.setState({ isDetails: state, origin, deliveries });
        const res = instance.getLocationsData();
        expect(res).toHaveLength(state ? 3 : 1);
        expect(res[0]).toHaveProperty("isCurrent", true);
        res.forEach((location, i) => {
          expect(location).toHaveProperty("label", expect.any(String));
          expect(location).toHaveProperty("title", expect.any(String));
          expect(location).toHaveProperty("subtitle", expect.any(String));
          if (i > 0) { expect(location).not.toHaveProperty("isCurrent"); }
        });
      });
    });

    it("returns the start and end dates elements", () => {
      instance.setState({
        isDetails: true,
        events: [
          { created_at: "01-12-2020", time_event: "01-12-2020", message: "test" },
          { created_at: "01-12-2020", time_event: "01-12-2020", message: "test" }
        ]
      });
      let res = instance.getStartEndDates();
      expect(res).toBeDefined();

      instance.setState({ isDetails: false });
      res = instance.getStartEndDates();
      expect(res).toBeNull();
    });

    it("returns the cta elements", () => {
      [
        { isDetails: true },
        { isDetails: false, isRunning: true }
      ].forEach((state) => {
        instance.setState(state);
        const res = instance.getCta();
        expect(res).toBeNull();
      });

      [
        { isDetails: false, isRunning: false },
        { isMyShipments: true, type: "programmed", status: "picking" },
        { isMyShipments: true, type: "programmed", status: "delivered" },
        { isMyShipments: true, type: "instant", status: "picking" }
      ].forEach((state) => {
        instance.setState(state);
        const res = instance.getCta();
        expect(res).toBeDefined();
      });
    });
  });

  describe("state update", () => {
    it("returns incoming props as the state key-value pairs (uncovered cases)", () => {
      const _shipment = { ...shipment };
      _shipment.model.content = null;
      _shipment.model.comments = null;
      _shipment.model.scheduled = true;
      _shipment.btnText = { view: "view", accept: "accept", reject: "reject" };
      render.setProps({ shipment: _shipment });
      const res = instance.setPropsToState();
      expect(res.btnText).toEqual(_shipment.btnText);
      expect(res.content).toBe("");
      expect(res.comments).toBe("");
      expect(res.type).toBe("programmed");
    });
  });

  describe("styling", () => {
    it("returns the correct props for the payment method component", () => {
      const payment = { ...instance.state.payment };
      [
        { method: "test", iconSet: "FTR", icon: "help-circle" },
        { method: "tarjeta de crédito", iconSet: "FTR", icon: "credit-card" },
        { method: "créditos", iconSet: "MCI", icon: "progress-clock" },
        { method: "transferencia/consignación en banco", iconSet: "MCI", icon: "bank-transfer" },
        { method: "efectivo", iconSet: "FA", icon: "money" }
      ].forEach((config, i) => {
        payment.method = config.method;
        payment.amount = i === 1 ? 12345 : null;
        instance.setState({ payment, type: i === 1 ? "instant" : "programmed" });
        let res = instance.getPaymentProps();
        expect(res.iconSet).toBe(config.iconSet);
        expect(res.icon).toBe(config.icon);
        expect(res.title).toBe(i === 1 ? "$ 12,345" : "test");
        expect(res.styling).toBeDefined();
        expect(res.label).toBe("test");
      });
    });
  });
});