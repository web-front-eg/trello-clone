import { IDragTarget } from "../../models/IDragTarget";
import { IList } from "../../models/IList";

class AddedList implements IDragTarget, IList {
  constructor(public content: string) {

  }

  dragOverHandler(e: DragEvent): void {}

  dropHandler(e: DragEvent): void {}

  dragLeaveHandler(e: DragEvent): void {}
}
