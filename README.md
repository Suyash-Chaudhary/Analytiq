### Add user analytics to your website with just a single script!!

## TODO

- [*] Implement DomainManagement on Aggregator
- [*] Stream domain level aggregation thorugh Redis
- [*] Add clientwss service
- [*] Subscribe clientwss to the right streams
- [*] Forward events on the respective sockets
- [*] Extract Events, Publishers & Subscribers in a shared module
- [] Handle socket disconnection edge cases
  - [] Network Failures
  - [] Crashes
- [] Add gobal socket state to dashboard client
- [] Manage re-subscription when socket disconnects
- [] Add global state for real time domain analytics
- [] Link socket messages to domain state
- [] Choose database for stroing real time domain data
- [] Create models for real time domain data
- [] Add pagination to manage domains with heavy usage
  - [] Start with normal pagination
  - [] Add infinite scroll as a further capability
- [] Add page for individual visitor details
