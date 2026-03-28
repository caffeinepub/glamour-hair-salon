import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";

actor {
  type Booking = {
    name : Text;
    email : Text;
    phone : Text;
    date : Text;
    time : Text;
    stylist : Text;
    service : Text;
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      Nat.compare(booking1.date.size(), booking2.date.size());
    };
  };

  let bookings = Map.empty<Nat, Booking>();

  var nextId = 0;

  public shared ({ caller }) func createBooking(booking : Booking) : async Nat {
    let id = nextId;
    bookings.add(id, booking);
    nextId += 1;
    id;
  };

  public query func getBooking(id : Nat) : async Booking {
    switch (bookings.get(id)) {
      case (null) { Runtime.trap("Booking does not exist") };
      case (?booking) { booking };
    };
  };

  public query func getAllBookings() : async [Booking] {
    bookings.values().toArray().sort();
  };
};
