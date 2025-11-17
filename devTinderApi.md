------Auth Router------------------------->
1) POST/ signup.
2) POST/ login.
3) POST/ logout.


----------Profile Router------------------>
4) GET/profile/view.
5) PATCH/ profile/edit.
6) PATCH/ profile/password.

-----------Connection Request Router------------------>
7) POST/ request/send/interested/:userId.
8) POST/ request/send/ignored/: userId.
9) POST/ request/review/accepted/: requestId.
10) POST/ request/review/rejected/: requestId.

---------User Router------------------------->
11) GET/connections.
12) GET/requests/received.
12) GET/user/feed -Gets you the profile of other users on platform.


status: ignore, interested, accepted, rejected.