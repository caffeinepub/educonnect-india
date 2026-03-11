import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

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

  type ApplicationStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type TutorApplication = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    gender : Gender;
    subjects : [Text];
    classes : [Text];
    tuitionType : TuitionType;
    city : Text;
    experienceYears : Nat;
    qualification : Text;
    bio : Text;
    monthlyFees : Nat;
    status : ApplicationStatus;
    submittedAt : Int;
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
  let applications = Map.empty<Nat, TutorApplication>();
  let admins = List.empty<Text>();

  var nextRequirementId = 0;
  var nextMessageId = 0;
  var nextPaymentId = 0;
  var nextApplicationId = 0;

  public shared ({ caller }) func submitTutorApplication(
    name : Text,
    email : Text,
    phone : Text,
    gender : Gender,
    subjects : [Text],
    classes : [Text],
    tuitionType : TuitionType,
    city : Text,
    experienceYears : Nat,
    qualification : Text,
    bio : Text,
    monthlyFees : Nat,
  ) : async Nat {
    let app : TutorApplication = {
      id = nextApplicationId;
      name;
      email;
      phone;
      gender;
      subjects;
      classes;
      tuitionType;
      city;
      experienceYears;
      qualification;
      bio;
      monthlyFees;
      status = #pending;
      submittedAt = Time.now();
    };
    applications.add(nextApplicationId, app);
    let id = nextApplicationId;
    nextApplicationId += 1;
    id;
  };

  public query ({ caller }) func getTutorApplications() : async [TutorApplication] {
    applications.values().toArray();
  };

  public query ({ caller }) func getApplicationById(id : Nat) : async ?TutorApplication {
    applications.get(id);
  };

  public shared ({ caller }) func updateApplicationStatus(id : Nat, status : ApplicationStatus) : async Bool {
    switch (applications.get(id)) {
      case (null) { false };
      case (?app) {
        let updated = { app with status };
        applications.add(id, updated);
        true;
      };
    };
  };

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
};
