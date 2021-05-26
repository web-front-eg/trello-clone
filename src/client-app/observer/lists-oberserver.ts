import { ICard } from "models/ICard";
import { IList } from "models/IList";
import { Stack } from "typings";
import { GlobalObserver } from "./global-observer";

type TyCardOrList = ICard | IList;

class ListsObserver extends GlobalObserver<TyCardOrList> {
  private registereds: Stack<TyCardOrList> = new Stack();

  protected static _instance: ListsObserver;

  static get instance(): ListsObserver {
    // init a singleton
    if (!this._instance) {
      this._instance = new ListsObserver();
    }
    return this._instance;
  }

  // limit the access of ctor
  private constructor() {
    super();
  }

  register(title: string, description: string, numOfPeople: number): void {
    // const newProject: TyObservableInLists = new Project(
    //   Math.random().toFixed(2).toString(),
    //   title,
    //   description,
    //   numOfPeople
    // );
    // this.registeredLists.push(newProject);
    // this.broadcastAll(this.registeredLists);
  }

  registerNewList(newList: IList): void {}

  registerNewListOrCard(newCardOrList: TyCardOrList): void {
    this.registereds.push(newCardOrList);
    this.broadcastAll(this.registereds);
  }

  moveCard(): void {}

//   moveProject(projectId: string, newStatus: eProjectStatus) {
//     const correspondedProject = this.registereds.find(
//       prj => prj.id === projectId
//     );

//     if (correspondedProject && correspondedProject.status !== newStatus) {
//       correspondedProject.status = newStatus;
//       this.broadcastAll(this.registereds);
//     }
//   }
}
