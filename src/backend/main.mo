import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Gender = {
    #male;
    #female;
    #other;
    #noPreference;
  };

  type TuitionType = {
    #offline;
    #online;
    #both;
  };

  type UserRole = {
    #student;
    #tutor;
    #admin;
  };

  type Tutor = {
    id : Text;
    name : Text;
    gender : Gender;
    subjects : [Text];
    className : [Text];
    tuitionType : TuitionType;
    city : Text;
    experienceYears : Nat;
    bio : Text;
    photoUrl : ?Text;
    isApproved : Bool;
    role : UserRole;
  };

  type StudentRequirement = {
    id : Nat;
    className : Text;
    subject : Text;
    city : Text;
    tuitionType : TuitionType;
    preferredGender : Gender;
    postedBy : Text;
    postedAt : Int;
  };

  type Message = {
    id : Nat;
    senderId : Text;
    receiverId : Text;
    text : Text;
    timestamp : Int;
  };

  type Payment = {
    id : Nat;
    studentId : Text;
    tutorId : Text;
    amount : Nat;
    platformFee : Nat;
    tutorAmount : Nat;
    stripePaymentId : Text;
    createdAt : Int;
  };

  type PaymentRequest = {
    studentId : Text;
    tutorId : Text;
    amount : Nat;
    stripePaymentId : Text;
  };

  let tutors = Map.empty<Text, Tutor>();
  let requirements = Map.empty<Nat, StudentRequirement>();
  let messages = Map.empty<Nat, Message>();
  let payments = Map.empty<Nat, Payment>();
  let admins = List.empty<Text>();

  var nextRequirementId = 0;
  var nextMessageId = 0;
  var nextPaymentId = 0;

  public shared ({ caller }) func registerTutor(
    id : Text,
    name : Text,
    gender : Gender,
    subjects : [Text],
    className : [Text],
    tuitionType : TuitionType,
    city : Text,
    experienceYears : Nat,
    bio : Text,
    photoUrl : ?Text,
    isAdmin : Bool,
  ) : async () {
    let role : UserRole = if (isAdmin) { #admin } else { #tutor };
    let tutor : Tutor = {
      id;
      name;
      gender;
      subjects;
      className;
      tuitionType;
      city;
      experienceYears;
      bio;
      photoUrl;
      isApproved = false;
      role;
    };
    tutors.add(id, tutor);

    if (isAdmin) {
      admins.add(id);
    };
  };

  public shared ({ caller }) func postRequirement(
    className : Text,
    subject : Text,
    city : Text,
    tuitionType : TuitionType,
    preferredGender : Gender,
    postedBy : Text,
  ) : async () {
    let requirement : StudentRequirement = {
      id = nextRequirementId;
      className;
      subject;
      city;
      tuitionType;
      preferredGender;
      postedBy;
      postedAt = Time.now();
    };
    requirements.add(nextRequirementId, requirement);
    nextRequirementId += 1;
  };

  public shared ({ caller }) func sendMessage(senderId : Text, receiverId : Text, text : Text) : async () {
    let message : Message = {
      id = nextMessageId;
      senderId;
      receiverId;
      text;
      timestamp = Time.now();
    };
    messages.add(nextMessageId, message);
    nextMessageId += 1;
  };

  public shared ({ caller }) func createPayment(paymentRequest : PaymentRequest) : async () {
    let payment : Payment = {
      id = nextPaymentId;
      studentId = paymentRequest.studentId;
      tutorId = paymentRequest.tutorId;
      amount = paymentRequest.amount;
      platformFee = paymentRequest.amount / 10;
      tutorAmount = paymentRequest.amount - (paymentRequest.amount / 10);
      stripePaymentId = paymentRequest.stripePaymentId;
      createdAt = Time.now();
    };
    payments.add(nextPaymentId, payment);
    nextPaymentId += 1;
  };

  public shared ({ caller }) func approveTutor(tutorId : Text) : async () {
    switch (tutors.get(tutorId)) {
      case (null) { () };
      case (?tutor) {
        let updatedTutor = { tutor with isApproved = true };
        tutors.add(tutorId, updatedTutor);
      };
    };
  };

  public query ({ caller }) func getMessage(messageId : Nat) : async ?Message {
    messages.get(messageId);
  };

  public query ({ caller }) func getMessages(userId : Text) : async [Message] {
    messages.values().toArray().filter(
      func(msg) {
        msg.senderId == userId or msg.receiverId == userId;
      }
    );
  };
};
