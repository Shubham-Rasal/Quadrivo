# Quadrivo

LFGHO - Permisionless Agrement based Credit Delegation and Funding

### Workflow for sponsor

- Sponsor provides token like sepoliaEth to the vault.
- Vault issues shares to the sponsor.
- Sponsor uses this 


```

function mintGho() public {
  // Approve the Aave Pool to pull asset funds

  asset.approve(address(pool), 100e18);
  // Supply asset to the Aave Pool

  pool.supply(address(asset), 100e18, USER, 0);
  // Mint 10 GHO

  pool.borrow(address(gho), 100e18, 2, 0, USER);
}

```

- depositMatchingPool: Sponsor funds the vault with any ERC20 token linke eth or link.
                         New shares or vault tokens are minted to give to sponsor.
                        
- registerDelegationAggrement: Sponsor decides how his funds will be used.
For example - 
1. Project Owner has specific NFT
2. Project is deployed on a particular network
3. Project Owner holds some tokens

- send/recieve - These function are provided by CCIP for message passing

- registerProject - During Project Creation, all the agreements across all chains is verified,
                    and a total matching pool for that project is calculated.

- fundProject - User can fund the projects with their own tokens.
                  The contribution will be matched with a quadratic GHO amount from the vault
                based on allotted matching pool.