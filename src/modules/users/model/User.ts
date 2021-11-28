import { v4 as uuidV4 } from "uuid";

class User {
  // not setable
  id = uuidV4();
  created_at = new Date();
  updated_at = new Date();

  // setable
  name = "";
  email = "";
  admin = false;

  constructor() {
    return new Proxy<User>(this, {
      set(target, name, value) {
        const setables = ["name", "email", "admin"];
        const instance = target;

        if (
          !setables.includes(String(name)) ||
          typeof instance[name] !== typeof value
        )
          throw new Error("Illegal attribute value update");

        instance[name] = value;
        instance.updated_at = new Date();
        return true;
      },
    });
  }
}

export { User };
