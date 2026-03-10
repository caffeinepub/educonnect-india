import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";

module {
  type OldActor = {
    students : Map.Map<Text, OldStudent>;
    tutors : Map.Map<Text, OldTutor>;
    classBookings : List.List<OldClassBooking>;
    contactMessages : List.List<OldContactMessage>;
  };

  type OldStudent = {
    name : Text;
    email : Text;
    phone : Text;
    city : Text;
    subjectInterest : Text;
  };

  type OldTutor = {
    name : Text;
    email : Text;
    phone : Text;
    city : Text;
    subjectExpertise : Text;
    experienceYears : Nat;
    qualification : Text;
  };

  type OldClassBooking = {
    studentName : Text;
    email : Text;
    phone : Text;
    subject : Text;
    preferredDate : Text;
    preferredTime : Text;
    message : Text;
  };

  type OldContactMessage = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  type NewActor = {
    tutors : Map.Map<Text, NewTutor>;
    requirements : Map.Map<Nat, NewStudentRequirement>;
    messages : Map.Map<Nat, NewMessage>;
    payments : Map.Map<Nat, NewPayment>;
    admins : List.List<Text>;
    nextRequirementId : Nat;
    nextMessageId : Nat;
    nextPaymentId : Nat;
  };

  type NewGender = {
    #male;
    #female;
    #other;
    #noPreference;
  };

  type NewTuitionType = {
    #offline;
    #online;
    #both;
  };

  type NewUserRole = {
    #student;
    #tutor;
    #admin;
  };

  type NewTutor = {
    id : Text;
    name : Text;
    gender : NewGender;
    subjects : [Text];
    className : [Text];
    tuitionType : NewTuitionType;
    city : Text;
    experienceYears : Nat;
    bio : Text;
    photoUrl : ?Text;
    isApproved : Bool;
    role : NewUserRole;
  };

  type NewStudentRequirement = {
    id : Nat;
    className : Text;
    subject : Text;
    city : Text;
    tuitionType : NewTuitionType;
    preferredGender : NewGender;
    postedBy : Text;
    postedAt : Int;
  };

  type NewMessage = {
    id : Nat;
    senderId : Text;
    receiverId : Text;
    text : Text;
    timestamp : Int;
  };

  type NewPayment = {
    id : Nat;
    studentId : Text;
    tutorId : Text;
    amount : Nat;
    platformFee : Nat;
    tutorAmount : Nat;
    stripePaymentId : Text;
    createdAt : Int;
  };

  public func run(_old : OldActor) : NewActor {
    {
      tutors = Map.empty<Text, NewTutor>();
      requirements = Map.empty<Nat, NewStudentRequirement>();
      messages = Map.empty<Nat, NewMessage>();
      payments = Map.empty<Nat, NewPayment>();
      admins = List.empty<Text>();
      nextRequirementId = 0;
      nextMessageId = 0;
      nextPaymentId = 0;
    };
  };
};
