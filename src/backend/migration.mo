import Map "mo:core/Map";
import List "mo:core/List";

module {
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

  // Old Tutor had a `role` field
  type OldTutor = {
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

  // New Tutor without `role`
  type NewTutor = {
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

  type OldActor = {
    tutors : Map.Map<Text, OldTutor>;
    requirements : Map.Map<Nat, StudentRequirement>;
    messages : Map.Map<Nat, Message>;
    payments : Map.Map<Nat, Payment>;
    admins : List.List<Text>;
    nextRequirementId : Nat;
    nextMessageId : Nat;
    nextPaymentId : Nat;
  };

  type NewActor = {
    tutors : Map.Map<Text, NewTutor>;
    requirements : Map.Map<Nat, StudentRequirement>;
    messages : Map.Map<Nat, Message>;
    payments : Map.Map<Nat, Payment>;
    applications : Map.Map<Nat, TutorApplication>;
    admins : List.List<Text>;
    nextRequirementId : Nat;
    nextMessageId : Nat;
    nextPaymentId : Nat;
    nextApplicationId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let newTutors = old.tutors.map<Text, OldTutor, NewTutor>(
      func(_id, t) {
        {
          id = t.id;
          name = t.name;
          gender = t.gender;
          subjects = t.subjects;
          className = t.className;
          tuitionType = t.tuitionType;
          city = t.city;
          experienceYears = t.experienceYears;
          bio = t.bio;
          photoUrl = t.photoUrl;
          isApproved = t.isApproved;
        };
      }
    );
    {
      old with
      tutors = newTutors;
      applications = Map.empty<Nat, TutorApplication>();
      nextApplicationId = 0;
    };
  };
};
