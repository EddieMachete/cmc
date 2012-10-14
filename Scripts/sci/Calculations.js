sci.Provide('sci.Calculations');
/*--------------------------------------------------------------------------
	@method GetCuadraticPos
	@param float t, float a, float b, float c
	@description 
  --------------------------------------------------------------------------
*/
sci.Calculations = function(){};

sci.Calculations.GetQuadraticValue = function(t, a, b, c)
{
    // the quadratic bezier formula contains three terms for calculating a single value, either x or y, at a time.
    // I'm breaking those terms of the formula and saving their outputs in the ca, cb, cc, cd vars	
	var tt = 1 - t;
	var ca = tt * tt;		// component a
	var cb = (2*t) * (tt);	// component b
	var cc = t*t;			// component c
	
	return a * ca + b * cb + c * cc;
};

sci.Calculations.prototype.B = function()
{
}

/*--------------------------------------------------------------------------
	@method GetCubicPos
	@param 
	@description 
  --------------------------------------------------------------------------
*/
/*public static float GetCubicValue(float t, float a, float b, float c, float d)
{
// the cubic bezier formula contains four terms for calculating a single value, either x or y, at a time.
// I'm breaking those terms of the formula and saving their outputs in the ca, cb, cc, cd vars

//		var t3:Number = Math.pow(t, 3); // t to the power 3
//		var t2:Number = t*t; // t squared
	
//		var ca:Number = t3; // component a
//		var cb:Number = (3*t2) - t3; // component b
//		var cc:Number = 3*(t - (2*t2) + t3); // component c
//		var cd:Number = 1 - (3*t) + (3*t2) - t3; // component d

	float t1 = 1-t;

	float ca = Math.pow(t1, 3);
	float cb = 3*t*t1*t1;
	float cc = 3*t*t*t1;
	float cd = Math.pow(t, 3);
		
	return(a*ca + b*cb + c*cc + d*cd);
}*/

sci.Ready('sci.Calculations');