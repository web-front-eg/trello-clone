import { IList } from "../../models/IList";

class AddingList implements IList {
  constructor(public content: string) {}
}
