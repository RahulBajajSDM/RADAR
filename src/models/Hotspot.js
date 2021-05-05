export default class Hotspot {
  _id: string;
  address: string;
  agencyId: string;
  coordinate: Coordinate;
  createdBy: string;
  createdOn: string;
  creatorType: int;
  isDeleted: Boolean;
  location: [];
  name: string;
  radius: int;
  status: Boolean;
  isEntered: Boolean;

  constructor(hotspot) {
    _id = hotspot._id;
    address = hotspot.address;
    agencyId = hotspot.agencyId;
    coordinate = hotspot.coordinate;
    createdBy = hotspot.createdBy;
    createdOn = hotspot.createdOn;
    creatorType = hotspot.creatorType;
    isDeleted = hotspot.isDeleted;
    location = hotspot.location;
    name = hotspot.name;
    radius = hotspot.radius;
    status = hotspot.status;
  }
}
