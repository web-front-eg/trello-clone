import { IDragTarget } from "models/IDraggable";
import { IList } from "models/IList";

class AddedList implements IDragTarget, IList {
  dragOverHandler(e: DragEvent): void {}

  dropHandler(e: DragEvent): void {}

  dragLeaveHandler(e: DragEvent): void {}
}
