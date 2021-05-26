import { Stack, TyListener } from "../typings";

export class GlobalObserver<TObservable> {
  protected registeredListeners: TyListener<TObservable>[] = [];

  registerListener(newListener: TyListener<TObservable>): void {
    this.registeredListeners.push(newListener!);
  }

  protected broadcastAll(cardOrList: Stack<TObservable>): void {
    // broadcast only the copy
    this.registeredListeners.forEach(listener =>
      listener(cardOrList.deepCopyAsArr())
    );
  }
}
