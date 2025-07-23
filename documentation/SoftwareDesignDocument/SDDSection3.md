# SDD Section 3: Interface: APIs between the Front-End to the Back-End

- Supabase's RLS features enable us to connect the frontend and backend seamlessly by importing the anonymous key within the supabase settings.  This is done with code like this:

```js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  // site here 'https://cznflfshoiohzkklmeoo.supabase.co',
  // Anonymous key as a string here
)

export default supabase;
```

- This connects the database and the frontend through the backend while hiding security information that needs to stay invisible to users.
- All backend code that calls to the database through this connection is subject to the database's active RLS features.
