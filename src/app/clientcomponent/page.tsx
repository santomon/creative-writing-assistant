import MyRpcClientComponent from "../MyRpcClientComponent";

// for playing around with disabling SSR
// import dynamic from 'next/dynamic'
// const MyRpcClientComponent = dynamic(() => import('@/app/MyRpcClientComponent'), { ssr: false })

// a simple page to hold MyRpcClientComponent

export default function Home() {
  return (
      <MyRpcClientComponent/>
  )
}
