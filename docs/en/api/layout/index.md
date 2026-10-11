# Layout Instance

The layout instance is the graph's layout controller, responsible for executing the specific layout algorithm and managing the start, iteration, and stop of the layout. Get the current graph's layout instance via [`getLayout`](#getlayout).

## Properties

### id

- **Type**: `string`
- **Description**: The ID of the layout class.

### isStop

- **Type**: `boolean`
- **Description**: Whether the layout is stopped, used to control the start and end of the layout.

## Methods

### Lifecycle

#### execute

- **Parameters**: `options: LayoutOptions`
- **Returns**: A layout instance
- **Description**: The entry method for starting layout execution.

#### stop

- **Parameters**: None
- **Returns**: None
- **Description**: Ends the layout; called by iterative layouts.

#### restart

- **Parameters**: None
- **Returns**: None
- **Description**: Restarts the layout.

### Execution

#### layout

- **Parameters**: None
- **Returns**: None
- **Description**: The concrete method that executes the layout.

#### tick

- **Parameters**: `iterations: number`
- **Returns**: None
- **Description**: The method executed in an iterative layout. `iterations` indicates the number of pre-iterations; the default is one.

#### ticker

- **Parameters**: `ticker: Ticker`
- **Returns**: None
- **Description**: Executed once per frame by the external `Application.ticker`. Here, [`isStop`](#isstop) is used to control when execution ends and when it begins.
