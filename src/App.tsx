import React, { useMemo, useState } from "react"
import "./App.css"

const PERSON_IMAGE_NAME = "running-man-silhouette.svg"

const MAX_MUZZLE_VELOCITY = 850 // Lebel Spitzer
const MAX_DISTANCE_TO_TARGET = 300 // meters

const HUNT_MAP_WIDTH_METERS = 1250
const SECONDS_TO_RUN_ACROSS_MAP = 192 // 3:12 minutes, ref: https://www.youtube.com/watch?v=3wXshR6eb8s

const HUNTER_SPEED_METERS_PER_SECOND = HUNT_MAP_WIDTH_METERS / SECONDS_TO_RUN_ACROSS_MAP
const HUNTER_HEIGHT_METERS = 1.8288 // 6 feet

const WEAPONS = [
  {
    name: "Berthier Mle 1892",
    muzzleVelocity: 590,
  },
  {
    name: "Bomb Lance",
    muzzleVelocity: 60,
  },
  {
    name: "Bornheim No. 3",
    muzzleVelocity: 380,
  },
  {
    name: "Bornheim No. 3 Match",
    muzzleVelocity: 400,
  },
  {
    name: "Bornheim No. 3 Silencer",
    muzzleVelocity: 300,
  },
  {
    name: "Caldwell 92 New Army",
    muzzleVelocity: 230,
  },
  {
    name: "Caldwell Conversion Chain Pistol",
    muzzleVelocity: 300,
  },
  {
    name: "Caldwell Conversion Pistol",
    muzzleVelocity: 300,
  },
  {
    name: "Caldwell Conversion Uppercut",
    muzzleVelocity: 410,
  },
  {
    name: "Caldwell Pax",
    muzzleVelocity: 330,
  },
  {
    name: "Caldwell Pax Trueshot",
    muzzleVelocity: 410,
  },
  {
    name: "Caldwell Rival 78",
    muzzleVelocity: 425,
  },
  {
    name: "Caldwell Rival 78 Handcannon",
    muzzleVelocity: 350,
  },
  {
    name: "Crossbow",
    muzzleVelocity: 150,
  },
  {
    name: "Crown & King Auto-5",
    muzzleVelocity: 425,
  },
  {
    name: "Dolch 96",
    muzzleVelocity: 440,
  },
  {
    name: "Drilling",
    muzzleVelocity: 530,
  },
  {
    name: "Hand Crossbow",
    muzzleVelocity: 100,
  },
  {
    name: "Hunting Bow",
    muzzleVelocity: 150,
  },
  {
    name: "Lebel 1886",
    muzzleVelocity: 630,
  },
  {
    name: "LeMat Mark II Carbine",
    muzzleVelocity: 375,
  },
  {
    name: "LeMat Mark II Revolver",
    muzzleVelocity: 300,
  },
  {
    name: "LeMat Mark II UpperMat",
    muzzleVelocity: 450,
  },
  {
    name: "Martini-Henry IC1",
    muzzleVelocity: 400,
  },
  {
    name: "Mosin-Nagant M1891",
    muzzleVelocity: 615,
  },
  {
    name: "Mosin-Nagant M1891 Obrez",
    muzzleVelocity: 550,
  },
  {
    name: "Nagant M1895",
    muzzleVelocity: 330,
  },
  {
    name: "Nagant M1895 Officer",
    muzzleVelocity: 330,
  },
  {
    name: "Nagant M1895 Officer Carbine",
    muzzleVelocity: 360,
  },
  {
    name: "Nagant M1895 Silencer",
    muzzleVelocity: 250,
  },
  {
    name: "Nitro Express Rifle",
    muzzleVelocity: 550,
  },
  {
    name: "Romero 77",
    muzzleVelocity: 450,
  },
  {
    name: "Romero 77 Handcannon",
    muzzleVelocity: 375,
  },
  {
    name: "Scottfield Model 3",
    muzzleVelocity: 280,
  },
  {
    name: "Sparks LRR",
    muzzleVelocity: 533,
  },
  {
    name: "Sparks LRR Pistol",
    muzzleVelocity: 453,
  },
  {
    name: "Sparks LRR Silencer",
    muzzleVelocity: 300,
  },
  {
    name: "Specter 1882",
    muzzleVelocity: 425,
  },
  {
    name: "Specter 1882 Compact",
    muzzleVelocity: 350,
  },
  {
    name: "Springfield 1866",
    muzzleVelocity: 490,
  },
  {
    name: "Springfield 1866 Compact",
    muzzleVelocity: 440,
  },
  {
    name: "Springfield M1892 Krag",
    muzzleVelocity: 610,
  },
  {
    name: "Vetterli 71 Karabiner",
    muzzleVelocity: 410,
  },
  {
    name: "Vetterli 71 Karabiner Cyclone",
    muzzleVelocity: 410,
  },
  {
    name: "Vetterli 71 Karabiner Silencer",
    muzzleVelocity: 280,
  },
  {
    name: "Winfield 1887 Terminus",
    muzzleVelocity: 425,
  },
  {
    name: "Winfield 1887 Terminus Handcannon",
    muzzleVelocity: 350,
  },
  {
    name: "Winfield 1893 Slate",
    muzzleVelocity: 425,
  },
  {
    name: "Winfield M1873",
    muzzleVelocity: 400,
  },
  {
    name: "Winfield M1873C",
    muzzleVelocity: 400,
  },
  {
    name: "Winfield M1873C Silencer",
    muzzleVelocity: 250,
  },
  {
    name: "Winfield M1873C Vandal",
    muzzleVelocity: 370,
  },
  {
    name: "Winfield M1876 Centennial",
    muzzleVelocity: 600,
  },
  {
    name: "Winfield M1876 Centennial Shorty",
    muzzleVelocity: 540,
  },
  {
    name: "Winfield M1876 Centennial Shorty Silencer",
    muzzleVelocity: 390,
  },
]

function calculateLeadDistanceMeters(args: {
  distanceToTarget: number
  bulletSpeedMetersPerSec: number
  enemySpeedMetersPerSec: number
}): { leadDistanceMeters: number; millisecondsToHitTarget: number } {
  const { distanceToTarget: distanceToTargetMeters, bulletSpeedMetersPerSec, enemySpeedMetersPerSec } = args

  // Time for the bullet to reach the target in seconds
  const timeToTarget = distanceToTargetMeters / bulletSpeedMetersPerSec

  // Time to target in milliseconds
  const millisecondsToHitTarget = timeToTarget * 1000

  // Distance the target moves in this time in meters
  const distanceTargetMovesMeters = timeToTarget * enemySpeedMetersPerSec

  return { leadDistanceMeters: distanceTargetMovesMeters, millisecondsToHitTarget }
}

enum InputType {
  SLIDER = "slider",
  TEXT = "text",
}

interface BulletLeadVisualizerProps {
  personHeightMeters: number // Assume the image's height represents this height in feet
}

const BulletLeadVisualizer: React.FC<BulletLeadVisualizerProps> = ({ personHeightMeters }) => {
  const [distanceToTarget, setDistanceToTarget] = useState(90) // meters
  const [muzzleVelocity, setMuzzleVelocity] = useState(400) // meters/second
  const [enemySpeedMeters, setEnemySpeedMeters] = useState(HUNTER_SPEED_METERS_PER_SECOND)
  const [displayMeterMarks, setDisplayMeterMarks] = useState(true)
  const [inputType, setInputType] = useState(InputType.SLIDER)

  const { leadDistanceMeters, millisecondsToHitTarget } = calculateLeadDistanceMeters({
    distanceToTarget,
    bulletSpeedMetersPerSec: muzzleVelocity,
    enemySpeedMetersPerSec: enemySpeedMeters,
  })

  const VISUALIZATION_WIDTH_VW = 80

  const personImageWidth = 100 // Height of the person image in the same units used in the SVG viewbox

  // Calculate scaled lead distance in SVG units
  // Assuming 1 feet in reality = 1 image height in the visualization
  const scaledLeadDistance = (leadDistanceMeters / personHeightMeters) * personImageWidth

  // Calculate the `x` position for the lead image and the line
  const leadImageXPosition = scaledLeadDistance

  // Calculate number of lines needed
  const maxLines = leadDistanceMeters + 2

  // Generate lines
  const lines = useMemo(() => {
    return Array.from({ length: maxLines }, (_, i) => i + 1)
  }, [maxLines])

  // Render two SVG running persons: one for the base, one for the lead
  return (
    <>
      <header className="App-header">
        <b>Bullet Lead Visualizer</b>
      </header>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ margin: 0, marginRight: "10px" }}>Input Type:</p>
        <div>
          <label htmlFor="slider">Slider</label>
          <input
            type="radio"
            id="slider"
            name="inputType"
            value={InputType.SLIDER}
            checked={inputType === InputType.SLIDER}
            onChange={() => setInputType(InputType.SLIDER)}
          />

          <label htmlFor="text">Text</label>
          <input
            type="radio"
            id="text"
            name="inputType"
            value={InputType.TEXT}
            checked={inputType === InputType.TEXT}
            onChange={() => setInputType(InputType.TEXT)}
          />
        </div>
      </div>

      <br />

      <div>
        <div>
          <label htmlFor="distanceToTarget">Distance to target ({distanceToTarget}m): </label>
          <input
            id="distanceToTarget"
            type={inputType === InputType.SLIDER ? "range" : "number"}
            min={0}
            max={MAX_DISTANCE_TO_TARGET}
            step={1}
            value={distanceToTarget}
            onChange={(e) => setDistanceToTarget(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="muzzleVelocity">Muzzle velocity ({muzzleVelocity}m/s): </label>
          <input
            id="muzzleVelocity"
            type={inputType === InputType.SLIDER ? "range" : "number"}
            min={0}
            max={MAX_MUZZLE_VELOCITY}
            step={10}
            value={muzzleVelocity}
            onChange={(e) => setMuzzleVelocity(Number(e.target.value))}
          />
        </div>

        <br />

        <div>
          <label htmlFor="weapon">Weapon: </label>
          <select id="weapon" value={muzzleVelocity} onChange={(e) => setMuzzleVelocity(Number(e.target.value))}>
            {WEAPONS.map((weapon) => (
              <option key={weapon.name} value={weapon.muzzleVelocity}>
                {weapon.name} ({weapon.muzzleVelocity}m/s)
              </option>
            ))}
          </select>
        </div>

        <hr style={{ width: "50%" }} />

        <div>
          <label htmlFor="leadDistance">Lead distance: </label>
          <output id="leadDistance">{leadDistanceMeters.toFixed(1)}m</output>
        </div>

        <div>
          <label htmlFor="millisecondsToHitTarget">Time to hit target: </label>
          <output id="millisecondsToHitTarget">{millisecondsToHitTarget.toFixed(0)}ms</output>
        </div>

        <br />

        <div>
          <label htmlFor="displayMeterMarks">Display meter marks: </label>
          <input
            id="displayMeterMarks"
            type="checkbox"
            checked={displayMeterMarks}
            onChange={(e) => setDisplayMeterMarks(e.target.checked)}
          />
        </div>

        <br />

        <section id="visualization" style={{ width: VISUALIZATION_WIDTH_VW + "vw", height: "300px" }}>
          <svg width="100%" height="300" viewBox={`0 0 ${personImageWidth * 2 + scaledLeadDistance} 200`}>
            <image
              width="150"
              height={personImageWidth * 2}
              href={PERSON_IMAGE_NAME}
              x="0"
              y="0"
              opacity="1"
              preserveAspectRatio="xMinYMin meet"
            />
            <image
              width="150"
              height={personImageWidth * 2}
              href={PERSON_IMAGE_NAME}
              x={leadImageXPosition}
              y="0"
              opacity="0.5"
              preserveAspectRatio="xMinYMin meet"
            />
            {displayMeterMarks &&
              lines.map((lineNumber) => {
                // TODO: What the fuck is the math behind this?
                const xPosition = lineNumber * 55
                const xOffset = 72
                return (
                  <React.Fragment key={lineNumber}>
                    <line
                      x1={xPosition + xOffset}
                      y1="0"
                      x2={xPosition + xOffset}
                      y2="90%"
                      stroke="gray"
                      strokeWidth="1"
                    />
                    <text x={xPosition + xOffset} y="90%" fill="gray">
                      {lineNumber}m
                    </text>
                  </React.Fragment>
                )
              })}
          </svg>
        </section>
      </div>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <BulletLeadVisualizer personHeightMeters={HUNTER_HEIGHT_METERS} />
    </div>
  )
}

export default App
